import { useEffect, useState } from "react"
import { getPostById } from "../src/graphql/posts"
import { checkLogin } from "../src/lib/api/common.api"
import client from '../src/graphql/Client'
import {useRouter} from 'next/router'
import dynamic from "next/dynamic"

const EditPost=()=>{
    const [logined,setLogined]=useState(false)
    const [post,setPost]=useState({
        title:null,
        body:null,
        urlSlug:null,
        description:null,
        category:null,
        tags:[]
    })

    const router=useRouter()

    useEffect(()=>{
        const checkAuth=async ()=>{
            setLogined(await checkLogin())
        }
        checkAuth()
    },[])

    useEffect(()=>{
        const fetchPost=async ()=>{
            if(!router.isReady) return
            const postData=await client.query({
                query:getPostById,
                variables:router.query
            })
            setPost(postData.data.postById)
        }
        fetchPost()
    },[router.isReady])

    if(!logined){
        return(<div>
            로그인이 필요합니다.
        </div>)
    }


    const Editor=dynamic(import('../src/components/Editor/Editor'),{ssr:false})

    return(
        <Editor title={post.title} body={post.body} category={post.category} description={post.bodyDescription} slug={post.urlSlug} edit={true} tags={post.tags}></Editor>
    )

}  

export default EditPost