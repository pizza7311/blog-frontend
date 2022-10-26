//recent posts page
import Layout from "../src/components/Layout/Layout";
import { getRecentPosts } from "../src/graphql/posts";
import Client from "../src/graphql/Client";
import Head from 'next/head';
import PostCard from './../src/components/PostCard/PostCard';

export default function Home({list}) {
  return (
    <>
            <Head>
                <title>YSH 블로그</title>
            </Head>
            <Layout>
                <div className="pt-12">
                  <h1 className="text-4xl font-extrabold">Latest</h1>
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
                </div>
            </Layout>
        </>
  )
}

export async function getStaticProps(){
  const {data}=await Client.query({
    query:getRecentPosts
  })

  return{
    props:{list:data.posts.posts},
    revalidate: 60
  }
}