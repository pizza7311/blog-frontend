import { useState } from 'react';
import { useRouter } from 'next/router';
import { login } from '../src/lib/api/common.api';

const Login=()=>{
    const [id,setId]=useState()
    const [pw,setPw]=useState()
    const router = useRouter()

    const handleId=(e)=>{
        setId(e.target.value)
    }

    const handlePw=(e)=>{
        setPw(e.target.value)
    }

    const handleSubmit=async ()=>{
        try{
            await login(id,pw)
            router.push('/')
        }catch(e){
            alert('error')
        }
    }

    return(
        <div>
            ID:<input onChange={handleId} value={id}></input>
            PW:<input onChange={handlePw} type={'password'} value={pw}></input>
            <button onClick={handleSubmit}>login</button>
        </div>
    )
}

export default Login