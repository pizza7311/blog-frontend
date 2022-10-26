
import Link from 'next/link'
import useCategories from './../../hooks/useCategories';
import splash from '../../utils/splash.json'
import { useState } from 'react';
import { useEffect } from 'react';
import menu_icon from '../../../public/icons/menu_icon.svg'
import Image from 'next/image'
import DropDownNavMenu from '../DropDownNavMenu/DropDownNavMenu';

const Header = () => {

    const [splashText, setSplash] = useState('')
    const [dropDown, setDropDown] = useState(false)

    useEffect(() => {
        setSplash(splash.texts[Math.floor(Math.random() * splash.texts.length)])
    }, [])

    const toggleDropNav = () => {
        setDropDown(!dropDown)
    }

    const { loading, categories } = useCategories()
    if (loading) {
        return (
            <div className={'fixed top-0 w-full h-[56px] shadow-md bg-blue-200 flex align-middle justify-center z-10'}>
                <div className={'relative flex items-center w-3/4 xl:min-w-[1000px] '}>
                    <div className='flex-none'>
                        <p className='font-sans font-extrabold text-2xl'><Link href={'/'} passHref><a>{splashText}</a></Link></p>
                    </div>
                    <div className="ml-auto">
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={'fixed top-0 w-full h-[56px] shadow-md bg-blue-300 flex z-10 align-middle justify-center'}>
                <div className={'relative flex items-center w-3/4 xl:min-w-[1000px] '}>
                    <div className='flex-none'>
                        <p className='font-sans font-extrabold text-2xl'><Link href={'/'} passHref><a>{splashText}</a></Link></p>
                    </div>
                    <div className="ml-auto">
                        <button className='block md:hidden w-8 h-8' onClick={toggleDropNav}>
                            <Image src={menu_icon} width={32} height={32}></Image>
                        </button>
                        <nav className='hidden md:block'>
                            <ul className={'flex'}>
                                {
                                    categories.categories.map(el => {
                                        return (
                                            <li key={el.urlSlug} className={'mr-2 p-[5px]'}><Link href={`/category/${el.urlSlug}/page/1`} passHref><a className={'font-semibold text-xl hover:text-white'}>{el.name}</a></Link></li>
                                        )
                                    })
                                }
                                <li className={'mr-2 p-[5px]'}><Link href={`/tag`} passHref><a className={'font-semibold text-xl hover:text-white'}>Tags</a></Link></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div className='w-full fixed z-0'>
                <DropDownNavMenu state={dropDown} categories={categories.categories}></DropDownNavMenu>
            </div>
        </>
    )
}

export default Header