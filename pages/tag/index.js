import Layout from "../../src/components/Layout/Layout"
import Head from 'next/head';
import Client from "../../src/graphql/Client";
import { getAllTags } from "../../src/graphql/tags";
import Link from "next/link";

const Tags = ({ tags }) => {
    return (
        <>
            <Head>
                <title>Tags</title>
            </Head>
            <Layout>
                <div className="mt-4">
                    {
                        tags.map(el => {
                            return (
                                <Link key={el.tagname} href={`/tag/${el.tagname}/page/1`} passHref>
                                    <a>
                                        <div className="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-gray-200 text-blue-700 rounded-full ml-2 mr-2 mt-1 mb-1">
                                            #{el.tagname} {el.count}
                                        </div>
                                    </a>
                                </Link>
                            )
                        })
                    }
                </div>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const { data } = await Client.query({
        query: getAllTags
    })
    return {
        props: { tags: data.tags },
        revalidate: 3600
    }
}

export default Tags