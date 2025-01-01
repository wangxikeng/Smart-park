import {createSlice} from "@reduxjs/toolkit";

const userListSlice=createSlice({
    name:'userList',
    initialState:{
        userData:{},
    },
    reducers:{
        // 存数据
        setUserData(state,action){
            state.userData=action.payload
        },
        // 清空数据
        clearUserData(state){
            state.userData={}
        }
    }
})

export const {setUserData,clearUserData}=userListSlice.actions

export default userListSlice.reducer
