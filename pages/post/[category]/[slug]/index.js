import PostView from "../../../../src/components/PostView/PostView";
import { getAllPostList,getPost } from "../../../../src/graphql/posts";
import client from '../../../../src/graphql/Client'
import parse from '../../../../src/utils/markDownParser';
import Head from 'next/head'

const PostPage=({html,title,date,description})=>{
    return (
        <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta property="og:title" content={title}></meta>
            <meta property="og:description" content={description}></meta>
        </Head>
        <PostView html={html} title={title} date={date}></PostView>
        </>
    )
}

export async function getStaticProps({params}) {
    const {data}=await client.query({
        query:getPost,
        variables:{
            category:params.category,
            urlSlug:params.slug
        }
    })
    if(!data.post){
        return{
            notFound:true
        }
    }
    const {post}=data
    const html = await parse(post.body)
    return {
        props: { html: html.value,title:post.title,date:post.date,description:post.bodyDescription },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const res=await client.query({
        query:getAllPostList
    })

    return {
        paths: res.data.posts.posts.map(post=>{
            return{
                params:{
                    slug:post.urlSlug,
                    category:post.category
                }
            }
        }),
        fallback: 'blocking'
    }
}

export default PostPage