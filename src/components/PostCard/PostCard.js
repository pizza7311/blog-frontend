import Link from "next/link"
import dayjs from 'dayjs'
import default_thumbnail from '../../../public/images/default_thumbnail.jpg'

const PostCard = ({ postData }) => {
    return (
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="w-full md:w-48">
                <Link href={`/post/${postData.category}/${postData.urlSlug}`}><a>
                    <img className="object-cover w-full h-52 rounded-t-lg rounded-b-lg md:h-[200px] md:w-48 md:rounded-none md:rounded-l-lg" src={postData.thumbnail?postData.thumbnail:default_thumbnail.src}></img>
                </a></Link>
            </div>
            <div className="flex flex-col w-fit justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><Link href={`/post/${postData.category}/${postData.urlSlug}`}><a>{postData.title}</a></Link></h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{postData.bodyDescription}</p>
                <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">{dayjs(postData.date).format('YYYY-MM-DD')}</p>
                <div className="flex justify-start">{postData.tags.map(el => (<Link key={el} href={`/tag/${el}/page/1`}><a className="mr-1 text-blue-500 hover:text-black hover:font-bold">#{el}</a></Link>))}</div>
            </div>
        </div>
    )
}

export default PostCard