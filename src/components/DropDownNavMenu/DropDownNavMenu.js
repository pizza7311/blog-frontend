import Link from "next/link"

const DropDownNavMenu = ({ state,categories }) => {
    return (
        <div className={`w-full md:hidden bg-white absolute duration-150 -z-10 ${state?"translate-y-0 mt-[56px]":"-translate-y-full"}`}>
            <nav>
                <ul className="z-0 bg-gray-200">
                    {
                        categories.map(el => {
                            return (
                                <li key={el.urlSlug} className={'w-full mr-2 p-[5px]'}><Link href={`/category/${el.urlSlug}/page/1`} passHref><a><p className={'font-semibold w-full text-xl text-center opacity-100'}>{el.name}</p></a></Link></li>
                            )
                        })
                    }
                    <li className={'w-full mr-2 p-[5px]'}><Link href={`/tag`} passHref><a><p className={'font-semibold w-full text-xl text-center'}>Tags</p></a></Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default DropDownNavMenu