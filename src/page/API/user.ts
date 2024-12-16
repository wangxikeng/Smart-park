import {post} from "../../utills/request.ts";

// 登录接口
interface LoginType{
    username:string,
    password:string
}
export const loginAPI = (data:LoginType) => post('/login',data)
