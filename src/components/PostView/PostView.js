import Layout from '../Layout/Layout'
import Viewer from '../Viewer/Viewer'
import Title from '../Title/Title'
import PostFooter from './../PostFooter/PostFooter';

const PostView=({html,title,date})=>{
    return(
        <Layout>
            <Title title={title} date={date}></Title>
            <Viewer html={html}></Viewer>
            <PostFooter></PostFooter>
        </Layout>
    )
}

export default PostView