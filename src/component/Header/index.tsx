import {DownOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {MenuProps} from 'antd';
import { Dropdown, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearMenuList, clearToken} from "../../store/login/authSlice.ts";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" >
            个人中心
            </a>
        ),
        icon:<UserOutlined />
    },
    {
        key: '2',
        label: (
            <a target="_blank">
                退出登录
            </a>
        ),
        icon:<LogoutOutlined />,
    },
];


const MyHeader=()=>{
    const navigate=useNavigate()
    const dispatch= useDispatch()
    const onClick: MenuProps['onClick'] = ({ key }) => {
        switch (key) {
            case '1':
                navigate('/personal')
                break;
            case '2':
                sessionStorage.removeItem('token')
                sessionStorage.removeItem('username')
                dispatch(clearToken())
                dispatch(clearMenuList())
        }
    };
    return <>
        <Dropdown menu={{ items,onClick}}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                  欢迎{sessionStorage.getItem('username')}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </>
}

export default MyHeader
