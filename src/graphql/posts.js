import { gql } from '@apollo/client';

export const getPostList = gql`
    query posts($category:String,$page:String){
        posts(category:$category,page:$page){
            posts{
                _id,
                title,
                urlSlug,
                date,
                thumbnail,
                bodyDescription,
                category
                tags
                },
            hasNext,
            hasPrev
        }
    }
`

export const getRecentPosts=gql`
    query recent{
        posts{
            posts{
                _id,
                title,
                urlSlug,
                date,
                thumbnail,
                bodyDescription,
                category
                tags
                },
        }
    }
`

//??? 이게뭔
export const getAllPostList = gql`
    query posts{
        posts{
            posts{
                urlSlug,
                category
            }
            
        }
    }
`

export const createPost = gql`
        mutation createPost($title:String!,$body:String!,$category:String!,$urlSlug:String!,$thumbnail:String,$bodyDescription:String,$tags:[String]){
            createPost(title:$title,body:$body,category:$category,urlSlug:$urlSlug,thumbnail:$thumbnail,bodyDescription:$bodyDescription,tags:$tags){
                postID,
                urlSlug
            }
        }
`

export const updatePost = gql`
    mutation updatePost($title:String!,$body:String!,$category:String!,$urlSlug:String!,$thumbnail:String,$bodyDescription:String,$_id:String!,$tags:[String]){
        updatePost(title:$title,body:$body,category:$category,urlSlug:$urlSlug,thumbnail:$thumbnail,bodyDescription:$bodyDescription,_id:$_id,tags:$tags){
            postID
        }
    }
`

export const getPost = gql`
    query Post($category:String!,$urlSlug:String!){
            post(category:$category,urlSlug:$urlSlug){
                title
                body
                date
                bodyDescription,
                tags
            }
        }
`

export const getPostById = gql`
    query Post($_id:String!){
        postById(_id:$_id){
            title
            body
            bodyDescription
            tags
            category
            thumbnail
            date
            urlSlug
            tags
        }
    }
`
//태그로 포스트 검색
export const getPostListByTag=gql`
    query posts($tag:String,$page:String){
        posts(tag:$tag,page:$page){
            posts{
                _id,
                title,
                urlSlug,
                date,
                thumbnail,
                bodyDescription,
                category
                tags
                },
            hasNext,
            hasPrev
        }
    }
`

export const getPreSignedURL = gql`
    mutation($filename:String!) {
                presignedURL(type:$filename){
                    url,key
                }
            }
`