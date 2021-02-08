import axios from 'axios'
import {Login , Register , AccessToken,SearchUser} from '../config/server'
const loginservice =async ({payload})=>{
    return await axios.post(Login , payload).then(data=>{
        return data.data
    }).catch(er=>{
        console.log(er);
        return null
    })

}
const registerService  =async ({payload})=>{
    return await axios.post(Register , payload).then(data=>{
        return data.data
    }).catch(er=>{
        console.log(er);
        return null
    })
}
const auth =async({token})=>{
    return await axios.get(AccessToken , {headers:{"Authorization":token}}).then(data=>{
        return data.data

    }).catch(err=>{
        console.log(err);
        return null
    })

}

const searchUser =async ({query  ,token})=>{
    const url = SearchUser +query
    return await axios.get(url , {headers:{"Authorization":token}})
    .then(data=>{
        return data.data
    }).catch(er=>{
        return null
    })

}
export  {loginservice  , registerService , auth , searchUser}
