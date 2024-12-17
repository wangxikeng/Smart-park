import axsios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios'
import {message} from "antd";
import {store} from "../store";

const  server=axsios.create({
    baseURL:'https://www.testdemo',
    timeout:5000
})

server.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    const token=store.getState().authSlice.token
    if(token){
        config.headers['Authorization']=`Bearer ${token}`
    }

    return config
})

server.interceptors.response.use((response:AxiosResponse)=>{
  const res=response.data
    if(res.code!==200){
        message.error(res.message)
        return Promise.reject(res)
    }
    return response.data
})


export default server
