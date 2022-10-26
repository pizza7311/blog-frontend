const PostCardSkeleton=()=>{
    return(
        <div className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-full dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <div className="w-full h-96 rounded-t-lg md:h-[200px] md:w-48 md:rounded-none md:rounded-l-lg bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col w-5/6 justify-between p-4 leading-normal animate-pulse">
                <div className="mb-2 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mb-3 h-4 bg-gray-200 rounded w-full"></div>
                <div className="mb-3 h-4 bg-gray-200 rounded w-full"></div>
            </div>
        </div>
    )
}

export default PostCardSkeleton