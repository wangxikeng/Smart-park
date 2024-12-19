// 存储token
import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        // 获取token
        token:sessionStorage.getItem('token')||null,
        // 存储菜单信息
        menuList:[]
    },
    reducers:{
        // 存token
        setToken:(state,action)=>{
            state.token=action.payload
            sessionStorage.setItem('token',action.payload)
        },
        clearToken:(state)=>{
            state.token=null
            sessionStorage.removeItem('token')
        },
        // 存储菜单
        setMenuList:(state,action)=>{
            state.menuList=action.payload
        },
        // 清除菜单
        clearMenuList:(state)=>{
            state.menuList=[]
        }
    }
})

export const {setToken,clearToken,setMenuList,clearMenuList}=authSlice.actions
export  default authSlice.reducer
