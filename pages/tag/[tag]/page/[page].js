import { useRouter } from "next/router"
import Client from "../../../../src/graphql/Client"
import { getAllTags } from '../../../../src/graphql/tags';
import { getPostListByTag } from '../../../../src/graphql/posts'
import Layout from '../../../../src/components/Layout/Layout';
import PostCard from "../../../../src/components/PostCard/PostCard";
import PageNavigation from "../../../../src/components/PageNavigation/PageNavigation";
import Head from "next/head";
import PostCardSkeleton from "../../../../src/components/PostCard/PostCardSkeleton";
import NotFound from '../../../404';

const TagPosts = ({ list, hasNext, hasPrev }) => {
    const router = useRouter()
    const { tag,page=1 } = router.query
    //url = /{태그}/page/{페이지}
    const currentPage=parseInt(page)?parseInt(page):1
    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>Tags</title>
                </Head>
                <Layout>
                    <div className="pt-12">
                        <div className="border-t-2 border-gray-500">
                            <ul>
                                <li className="pt-4 pb-4"><PostCardSkeleton></PostCardSkeleton></li>
                                <li className="pt-4 pb-4"><PostCardSkeleton></PostCardSkeleton></li>
                                <li className="pt-4 pb-4"><PostCardSkeleton></PostCardSkeleton></li>
                            </ul>
                        </div>
                    </div>
                </Layout>
            </>
        )
    }

    if (!list.length) {
        return (
            <>
                <Layout>
                    <NotFound></NotFound>
                </Layout>
            </>
        )
    }

    return (
        <>
            <Head>
                <title>{tag} - YSH</title>
            </Head>
            <Layout>
                <div className="pt-12">
                    <h1 className="text-4xl font-extrabold">{tag}</h1>
                    <div className="border-t-2 border-gray-500">
                        <ul>
                            {
                                list.map(post => {
                                    return (
                                        <li key={post._id} className="pt-4 pb-4">
                                            <PostCard postData={post} />
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <PageNavigation currentPage={currentPage} hasNext={hasNext} hasPrev={hasPrev} tag={tag}></PageNavigation>
                </div>
            </Layout>
        </>

    )
}

export const getStaticProps = async ({ params }) => {
    const {tag,page}=params
    const { data } = await Client.query({
        query: getPostListByTag,
        variables: { tag , page }
    })
    const { posts } = data
    return {
        props: {
            list: posts.posts,
            hasNext: posts.hasNext,
            hasPrev: posts.hasPrev
        },
        revalidate: 60
    }
}

export const getStaticPaths = async () => {
    const { data } = await Client.query({
        query: getAllTags
    })
    const arr = data.tags.map(el => {
        return { params: { tag: el.tagname,page:'1' } }
    })
    return {
        paths: arr,
        fallback: 'blocking'
    }
}

export default TagPosts