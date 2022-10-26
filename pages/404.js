import icon_ganyu from '../public/icons/icon_ganyu_upset.webp'
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const NotFound = () => {


    return (
        <>
        <Head>
            <title>
                {`There's Nothing`}
            </title>
        </Head>
        <div className='w-full h-full'>
            <div className='absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%]'>
                <div className='w-full flex justify-center'>
                        <Image alt='notFound' title='뭘 찾고 있는거지?' src={icon_ganyu} width='256' height='256'></Image>
                </div>
                <div className='p-4'>
                    <h1 className='font-bold text-2xl'>해당페이지를 찾을수 없습니다.</h1>
                </div>
                <div className='flex justify-center'>
                    <Link href='/'>
                        <a>
                            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>Home</button>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default NotFound