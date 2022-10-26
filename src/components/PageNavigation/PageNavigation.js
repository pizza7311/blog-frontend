import Link from 'next/link'

const PageNavigation = ({ hasNext, hasPrev, category, currentPage,tag }) => {
    let nextUrl,prevUrl
    //prop에 카테고리 or 태그에 따라 다른 url 전달
    if(category&&!tag){
        nextUrl=`/category/${category}/page/${currentPage + 1}`
        prevUrl=`/category/${category}/page/${currentPage - 1}`
    }else if(!category&&tag){
        nextUrl=`/tag/${tag}/page/${currentPage + 1}`
        prevUrl=`/tag/${tag}/page/${currentPage - 1}`
    }
    return (
        <div className='flex w-full justify-between h-8 mt-4 mb-4 '>
            <div className='flex flex-1 justify-start'>
                {hasPrev ?
                    <div>
                        <Link passHref href={prevUrl}>
                            <a>
                                <p className='text-lg font-semibold hover:text-blue-300'>{`◀ Prev`}</p>
                            </a>
                        </Link>
                    </div> :
                    <div></div>
                }
            </div>
            <div className='flex flex-1 justify-center'>
                <p className='text-2xl font-extrabold text-blue-500 underline'>
                    {currentPage}
                </p>
            </div>
            <div className='flex flex-1 justify-end'>
                {hasNext ?
                    <div>
                        <Link passHref href={nextUrl}>
                            <a>
                                <p className='text-lg font-semibold hover:text-blue-300'>{`Next ▶`}</p>
                            </a>
                        </Link>
                    </div> :
                    <div></div>
                }
            </div>
        </div>
    )
}

export default PageNavigation