import { getPostList } from "../src/graphql/posts"
import { getAllTags } from "../src/graphql/tags"
import client from '../src/graphql/Client'
const SiteMap=()=>{}

export const getServerSideProps = async ({res})=>{

    const url=`https://pizza7311.me`
    const data=await Promise.all([client.query({query:getPostList}),client.query({query:getAllTags})])

    const postURLMap=data[0].data.posts.posts.map(post=>{
        return `<url><loc>${url}/post/${post.category}/${post.urlSlug}</loc></url>`
    })
    const tagMap=data[1].data.tags.map(tag=>{
        return `<url><loc>${url}/tag/${tag.tagname}</loc></url>`
    })

    const list=`${postURLMap.join('\n')}${tagMap.join('\n')}`

    const xml = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://pizza7311.me/tag</loc>
            </url>
            <url>
                <loc>https://pizza7311.me/category/dev</loc>
            </url>
            ${list}
        </urlset>
    `
    res.writeHead(200, { 'Content-Type': 'text/xml'})
    res.end(xml.trim())

    return {
        props: {},
      }
}

export default SiteMap