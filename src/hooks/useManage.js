import { useEffect, useState } from "react"
import { checkLogin } from "../lib/api/common.api"

const useManage=()=>{

    const [isLogined,setIsLogined]=useState(false)

    useEffect(()=>{
        const checkAuth=async ()=>{
            const auth=await checkLogin()
            if(auth){
                setIsLogined(true)
            }
        }
        checkAuth()
    },[])

    return{
        isLogined
    }
}

export default useManage