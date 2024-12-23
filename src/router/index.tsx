
import React from "react";
import RequireAuth from "../utills/requireAuth.tsx";
// 路由懒加载
const Home: React.LazyExoticComponent<React.ComponentType<any>> = React.lazy(() => import("../page/home"));
const Login:React.LazyExoticComponent<React.ComponentType<any>> =React.lazy(()=>import("../page/login"));
const NotFound:React.LazyExoticComponent<React.ComponentType<any>>  =React.lazy(()=>import("../page/404"));
// const router=createBrowserRouter([
//     {
//         path:"/",
//         element:<RequireAuth allowed={true} redirect={'/login'}><Home/></RequireAuth>
//     },
//     {
//         path:'/login',
//         element:<RequireAuth allowed={false} redirect={'/'}><Login/></RequireAuth>
//     },
//     {
//         path:'*',
//         element:<NotFound></NotFound>
//     }
// ])
const routerTem:any=[
    {
        path:"/",
        element:<RequireAuth allowed={true} redirect={'/login'}><Home/></RequireAuth>
    },
    {
        path:'/login',
        element:<RequireAuth allowed={false} redirect={'/dashboard'}><Login/></RequireAuth>
    },
    {
        path:'*',
        element:<NotFound></NotFound>
    }
]

export default routerTem
