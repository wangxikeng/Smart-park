
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useEffect, useState,Suspense} from "react";
import {useDispatch, useSelector} from "react-redux";
import {generateRouters} from "./utills/generateRouters.tsx";
import routerTem from "./router";
import {getMenuAPI} from "./API/user.ts";
import {setMenuList} from "./store/login/authSlice.ts";


function App() {
    const [routerConfig,setRouterConfig]=useState<any>([])
    const dispatch = useDispatch()
    const {token}=useSelector((state:any)=>state.authSlice)
    useEffect(()=>{
        // 获取菜单
        getMenu()
    },[token])

    // 获取菜单权限
    const getMenu=async ()=>{
        const {data}=await getMenuAPI()
        // 如果存在登录
        if(data.length){
            // 存储菜单信息
            dispatch(setMenuList(data))
            // routerTem 为静态路由
            routerTem[0].children=generateRouters(data) // generateRouters 从Redux 中取出的菜单转化的动态路由
            // 默认选中第一个
            routerTem[0].children[0].index=true
        }
        //组成新路由
        setRouterConfig(routerTem)
    }

  if(routerConfig.length){
      return (
          <div className='APP'>
              <Suspense fallback={<div>加载中</div>}>
                  <RouterProvider router={createBrowserRouter(routerConfig)}>
                  </RouterProvider>
              </Suspense>
          </div>
      )
  }
}

export default App
