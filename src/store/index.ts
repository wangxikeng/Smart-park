import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./login/authSlice.ts";

export const store=configureStore({
    reducer:{
        authSlice
    }
})
