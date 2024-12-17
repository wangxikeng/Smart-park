import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";

interface Ipros{
    allowed:boolean
    redirect:string
    children:React.ReactNode
}
const RequireAuth=({allowed,redirect,children}:Ipros)=>{
   const {token}= useSelector((state:any)=>state.authSlice)
    const navigate=useNavigate()
    const isLogin=!!token
    // 要放到生命周期中
    useEffect(()=>{
        if(allowed!==isLogin){
            // 不相符，redirect
            navigate(redirect)
        }
    },[allowed,redirect,isLogin])

    return allowed===isLogin?<>{children}</>:<></>
}

export default RequireAuth
