import './index.scss'
import bg from '../../assets/bg.webp'
import logo from '../../assets/logo.webp'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import {loginAPI} from "../API/user.ts";

const Login=()=>{
    // 获取表单实例
    const [form]=Form.useForm()

    // 登录按钮
    const onFinish= ()=>{
        form.validateFields().then(async(res)=>{
            const data=await loginAPI(res)
            console.log(data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    return <>
        <div className='login' style={{ backgroundImage:`url(${bg})`}}>
        <div className='login-submit'>
            <div className='login-header'>
                <div className='login-logo'>
                    <img src={logo} width={100}/>
                </div>
                <div className='login-title'>
                    智慧园区管理平台
                </div>
                <Form
                    form={form}
                    name="login"
                    initialValues={{ remember: true }}
                    style={{ maxWidth: 360 }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入登录名' }]}
                    >
                        <Input prefix={<UserOutlined />} placeholder="登录名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password prefix={<LockOutlined />} type="password" placeholder="密码" />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
        </div>
    </>
}

export default Login
