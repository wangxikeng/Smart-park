// 存储token
import {createSlice} from "@reduxjs/toolkit";

const authSlice=createSlice({
    name:'auth',
    initialState:{
        // 获取token
        token:sessionStorage.getItem('token')||null
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
        }
    }
})

export const {setToken,clearToken}=authSlice.actions
export  default authSlice.reducer
