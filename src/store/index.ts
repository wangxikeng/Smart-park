import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./login/authSlice.ts";
import userListSlice from "./user/userListSlice.ts";

export const store=configureStore({
    reducer:{
        authSlice,
        userListSlice
    }
})
