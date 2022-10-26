import { useState } from "react"
import GithubIcon from "../Icons/GithubIcon"
import jumpScare from '../../../public/images/suprise.gif'

const Footer = () => {

    const [suprise,setSuprise]=useState(false)
    const toggle=()=>{
        if(suprise) return
        setSuprise(!suprise)
        setTimeout(()=>setSuprise(false),15000)
    }

    return (
        <>
        <div className="h-[80px] border-t-2 border-gray-200 w-full justify-center align-middle">
            <div className="flex h-[24px] mt-3 justify-center">
                <a className="h-1" target="_blank" rel="noopener noreferrer" href='https://github.com/pizza7311'>
                    <GithubIcon></GithubIcon>
                </a>
            </div>
            <div className="justify-center flex text-gray-400">
                <p onClick={toggle}>
                    Do you want something exciting?
                </p>
            </div>
            <div className="justify-center flex text-sm">
                <p>
                    © 2022. YSH All rights reserved.
                </p>
            </div>
        </div>
        {suprise && <div className="fixed left-0 top-0">
            <img src={jumpScare.src}></img>
        </div>}
        </>
    )
}

export default Footer