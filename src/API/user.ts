import {get, post} from "../utills/request.ts";

// 登录接口
interface LoginType{
    username:string,
    password:string
}

// 登录接口
export const loginAPI = (data:LoginType) => post('/login',data)

// 获取菜单权限
export const getMenuAPI = () => get('/menu')
