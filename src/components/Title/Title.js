import dayjs from 'dayjs'

const Title=({title,date})=>{
    return(
        <>
            <div className="w-full pt-8">
                <h1 className='text-center font-bold text-2xl sm:text-4xl'>{title}</h1>
                <h4 className='pt-2 text-right font-sans text-gray-500 border-b-2 border-blue-400'>{dayjs(date).format('YYYY.MM.DD')}</h4>
            </div>
        </>
    )
}

export default Title