import client from "../../../../src/graphql/Client"
import { getPostList } from '../../../../src/graphql/posts'
import { getCategories } from "../../../../src/graphql/categories"
import Layout from '../../../../src/components/Layout/Layout';
import PostCard from "../../../../src/components/PostCard/PostCard";
import { useRouter } from 'next/router';
import PostCardSkeleton from "../../../../src/components/PostCard/PostCardSkeleton";
import NotFound from '../../../404';
import PageNavigation from "../../../../src/components/PageNavigation/PageNavigation";
import Head from "next/head";


const CategoryPostList = ({ list, hasNext, hasPrev }) => {
    const router = useRouter()
    const { category, page } = router.query
    const currentPage=parseInt(page)?parseInt(page):1
    if (router.isFallback) {
        return (
            <>
                <Head>
                    <title>{category}</title>
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
                <title>{category}</title>
            </Head>
            <Layout>
                <div className="pt-12">
                    <h1 className="text-4xl font-extrabold">{category}</h1>
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
                    <PageNavigation currentPage={currentPage} hasNext={hasNext} hasPrev={hasPrev} category={category}></PageNavigation>
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps({ params }) {
    const {category,page}=params
    const { data } = await client.query({
        query: getPostList,
        variables: {
            category: category,
            page: page
        }
    })
    if (!data.posts) {
        return {
            notFound: true
        }
    }
    return {
        props: { list: data.posts.posts, hasNext: data.posts.hasNext, hasPrev: data.posts.hasPrev },
        revalidate: 60
    }
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: getCategories
    })
    return {
        paths: data.categories.map(category => {
            return { params: { category: category.name, page: '1' } }
        }),
        fallback: 'blocking'
    }
}

export default CategoryPostList