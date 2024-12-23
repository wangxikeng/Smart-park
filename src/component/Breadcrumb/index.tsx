import {useLocation} from "react-router-dom";
import {Breadcrumb} from "antd";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {MenuItemFromAPI} from "../Menu";

interface BreadcrumbType{
    title:string
}
const MyBreadCrumb=()=>{
    // 获取路由信息
    const location = useLocation()

    // 获取Redux 中菜单列表
    const {menuList}=useSelector((state:any)=>state.authSlice)
    const [breadcrumbItems,setBreadcrumbItems]=useState<BreadcrumbType[]>([])
    useEffect(()=>{
      if(menuList.length){
          setBreadcrumbItems(getTitle(location.pathname,menuList))
      }
    },[location.pathname,menuList])

    // 递归获取面包屑
    const getTitle=(pathname:string,menuList:MenuItemFromAPI[]):BreadcrumbType[]=>{
        for(let item of menuList){
            // 使用startsWith()方法判断路径是否以当前菜单的key开头
            if(pathname.startsWith(item.key)){
                // 匹配成功
                const currentPath={title:item.label}
                if(!item.children){
                    return [currentPath]
                }
                const childBreadcrumbs=getTitle(pathname,item.children)
                return [currentPath,...childBreadcrumbs]
            }
        }
        return []
    }

    return <div>
        <Breadcrumb className='mt' items={breadcrumbItems} />
    </div>
}

export default MyBreadCrumb
