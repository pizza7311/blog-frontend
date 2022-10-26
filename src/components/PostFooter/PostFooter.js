import Link from "next/link"
import { useRouter } from 'next/router';

const PostFooter = () => {
    const router=useRouter()
    return (
        <div className="flex justify-center mt-4 mb-4">
            <Link href={`/category/${router.query.category}`} passHref>
            <a>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
                카테고리 목록으로
            </button>
            </a>
            </Link>
        </div>
    )
}

export default PostFooter