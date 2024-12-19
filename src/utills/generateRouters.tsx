
// 动态生成菜单权限

import {componentMap} from "../router/routerMap.tsx";
import {RouteObject} from "react-router-dom";

interface MenuListType{
    icon:string
    label:string
    key:string
    children?:MenuListType[]
}
export const generateRouters=(menuList:MenuListType[])=>{
   return menuList.map((item:MenuListType)=>{
       // 没有孩子
       const isHasChildren=!!item.children
       const temRouter:RouteObject={
           path:item.key,
           element:isHasChildren?null:<>{componentMap[item.key]}</>
       }
       // 有孩子
       if(item.children){
           temRouter.children=generateRouters(item.children)
       }
       return temRouter
   })
}
