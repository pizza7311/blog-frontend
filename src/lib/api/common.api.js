import axios from '../axios'

export const login=async (id,pw)=>{
    await axios.post('/user/login',{id,pw})
    return
}

export const checkLogin=async ()=>{
    return (await axios.get('/user/login')).data
}

export const uploadImage=async (file,url)=>{
    try {
        await axios.put(url, file, { withCredentials: false })
    } catch (e) {
        console.log(e.data)
    }
    return
}

export const getPresignedURL=async (query,filename)=>{
    return (await axios.post('/graphql',{
        query,
        variables:{
            filename
        }
    })).data
}