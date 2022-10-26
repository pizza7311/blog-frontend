import { useState, useRef, useEffect } from 'react';
import { createPost,getPreSignedURL,updatePost } from '../graphql/posts';
import { useMutation } from '@apollo/client';
import {uploadImage} from '../lib/api/common.api'
import { useRouter } from 'next/router';
import useCategories from './useCategories';


const useEditor = ({_title,_slug,_category,_description,_tags=[]}) => {
    const [modalState, setModalState] = useState(false)
    const [title, setTitle] = useState(_title)
    const [slug, setSlug] = useState(_slug)
    const [category, setCategory] = useState(_category)
    const [thumbnail, setThumbnail] = useState()
    const [description,setDescription]=useState(_description)
    const [thumbnailList,setThumbnailList]=useState([])
    const [tags,setTags]=useState(_tags)
    const [tag,setTag]=useState('')

    const router=useRouter()

    const {loading,categories}=useCategories()

    const editorRef = useRef()

    const [getUploadURL]=useMutation(getPreSignedURL)

    const [submit]=useMutation(createPost)
    const [modifySubmit]=useMutation(updatePost)

    //커스텀 이미지 핸들러 등록
    useEffect(() => {
        const instance = editorRef.current.getInstance()
        instance.removeHook('addImageBlobHook')
        instance.addHook('addImageBlobHook', async (file, cb) => {
            try{
                const {data}=await getUploadURL({variables:{filename:file.name}})
                const {url,key}=data.presignedURL
                await uploadImage(file,url)
                const imageURL=`${process.env.NEXT_PUBLIC_IMAGE_CDN}/${key}`
                setThumbnailList(thumbnailList.concat(imageURL+'?w=400'))
                cb(imageURL,'tui editor doesn\'t support description!')
            }catch(e){
                alert('권한이 없습니다.')
            }
        })

    }, [thumbnailList])

    const handleSubmit = async () => {
        try{
            await submit({
                variables: {
                    title: title,
                    body: editorRef.current.getInstance().getMarkdown(),
                    category: category,
                    urlSlug: slug,
                    thumbnail: thumbnail?thumbnail:thumbnailList[0],
                    bodyDescription:description,
                    tags
                }
            })
            router.push('/')
        }catch(e){
            console.log(e)
            alert('권한이 없습니다.')
        }
    }

    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleSlug = (e) => {
        setSlug(e.target.value)
    }

    const handleCategory = (e) => {
        setCategory(e.target.value)
    }

    const handleDescription=(e)=>{
        setDescription(e.target.value)
    }

    const toggleThumbnailModal = () => {
        setModalState(!modalState)
    }

    const handleModifySubmit=async ()=>{
        try{
            await modifySubmit({
                variables:{
                    title: title,
                    body: editorRef.current.getInstance().getMarkdown(),
                    category: category,
                    urlSlug: slug,
                    thumbnail: thumbnail?thumbnail:thumbnailList[0],
                    bodyDescription:description,
                    tags,
                    _id:router.isReady?router.query._id:''
                }
            })
            router.push('/')
        }catch(e){
            console.log(e)
            alert('error!')
        }
        
    }

    const handleTag=(e)=>{
        setTag(e.target.value)
    }

    const handleAddTag=(e)=>{
        if(e.key==='Enter'){
            const trimed=tag.trim()
            if(!tags.find(el=>el===trimed) && (trimed!=='')){
                setTags([...tags,trimed])
            }
            setTag('')
        }
    }

    const handleDeleteTag=(target)=>{
        setTags(tags.filter(el=>el!==target))
    }


    return {
        modalState, toggleThumbnailModal,
        handleCategory, category,
        handleSlug, slug,
        handleSubmit,
        handleTitle, title,
        handleDescription,description,
        handleModifySubmit,
        tags,handleTag,tag,handleAddTag,
        handleDeleteTag,
        categoryList:loading?[]:categories.categories,
        editorRef
    }
}

export default useEditor