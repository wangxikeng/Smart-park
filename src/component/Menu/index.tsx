import React, {useEffect, useState} from 'react'
import './index.scss'
interface MenuItem{
   key:string
    icon?:React.ReactNode
    label:string
    children?:MenuItem[]
}
export interface MenuItemFromAPI{
    key:string
    icon:string
    label:string
    children?:MenuItemFromAPI[]
}
import {  Menu } from 'antd';
import icons from "./iconList.tsx";
import { useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";
// const items: MenuItem[] = [
//     { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
//     { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
//     { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
//     {
//         key: 'sub1',
//         label: 'Navigation One',
//         icon: <MailOutlined />,
//         children: [
//             { key: '5', label: 'Option 5' },
//             { key: '6', label: 'Option 6' },
//             { key: '7', label: 'Option 7' },
//             { key: '8', label: 'Option 8' },
//         ],
//     },
//     {
//         key: 'sub2',
//         label: 'Navigation Two',
//         icon: <AppstoreOutlined />,
//         children: [
//             { key: '9', label: 'Option 9' },
//             { key: '10', label: 'Option 10' },
//             {
//                 key: 'sub3',
//                 label: 'Submenu',
//                 children: [
//                     { key: '11', label: 'Option 11' },
//                     { key: '12', label: 'Option 12' },
//                 ],
//             },
//         ],
//     },
// ];

const MyMenu=({collapsed}: {collapsed: boolean})=>{
    const {menuList}=useSelector((state:any)=>state.authSlice)
    const navigate=useNavigate()
    const [menuData,setMenuData]=useState<MenuItem[]>([])
    const location=useLocation()
    useEffect(() => {
       const newMenuList= handleMenu(menuList)
        setMenuData(newMenuList)
    }, [menuList]);


    // 处理菜单权限
    const handleMenu=(data:MenuItemFromAPI[]):MenuItem[]=>{
        return  data.map((item:MenuItemFromAPI)=>{
            return {
                key:item.key,
                icon: icons[item.icon],
                label:item.label,
                children:item.children&&handleMenu(item.children)
            }
        })
    }
    // 跳转页面
    const onGoToPage=({key}:{key:string})=>{
        navigate(key)
    }
    return <>
        <div className={`menu ${collapsed ? 'collapsed' : ''}`}>
           <h1>智慧园区后台管理平台</h1>
        </div>
            <Menu
                defaultSelectedKeys={['/dashboard']}
                mode="inline"
                theme="dark"
                onClick={onGoToPage}
                items={menuData}
                selectedKeys={[location.pathname]}
            />
    </>
}

export default MyMenu
