import {post} from "../utills/request.ts";

// 获取楼宇数据
export const tenementListAPI = (data:any) => post('/tenementList',data)

// 修改楼宇数据
export const editTenementAPI = (data:any) => post('/editTenement',data)

// 删除楼宇数据
export const deleteTenementAPI = (data:any) => post('/deleteTenement',data)
