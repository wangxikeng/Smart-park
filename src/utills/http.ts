import axsios, {AxiosResponse, InternalAxiosRequestConfig} from 'axios'

const  server=axsios.create({
    baseURL:'https://www.testdemo',
    timeout:5000
})

server.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
    return config
})

server.interceptors.response.use((response:AxiosResponse)=>{
    return response
})


export default server
