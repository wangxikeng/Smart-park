import {post} from "../utills/request.ts";
import {DataType} from "../page/user/type";

// 获取用户数据
export const userListAPI = (data:any) => post('/userListData',data)

// 删除用户
export const deleteUserAPI = (data:any) => post('/deleteUser',data)

// 批量删除
export const deleteBatchUserAPI = (data:any) => post('/deleteUsers',data)

// 新增或编辑
export const addOrEditUserAPI = (data:DataType) => post('/addOrEditUser',data)
