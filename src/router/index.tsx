import {createBrowserRouter} from "react-router-dom";
import React from "react";
// 路由懒加载
const Home: React.LazyExoticComponent<React.ComponentType<any>> = React.lazy(() => import("../page/home"));
const Login:React.LazyExoticComponent<React.ComponentType<any>> =React.lazy(()=>import("../page/login"));
const NotFound:React.LazyExoticComponent<React.ComponentType<any>>  =React.lazy(()=>import("../page/404"));
const router=createBrowserRouter([
    {
        path:"/",
        element:<Home/>
    },
    {
        path:'/login',
        element:<Login></Login>
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
])

export default router
