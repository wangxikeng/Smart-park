
import Mock from 'mockjs';
// 配置登录接口
Mock.mock('https://www.testdemo/login', 'post', (config:any) => {
const {username,password}=JSON.parse(config.body)
    if(username==='admin'&&password=='admin123'){
        return {
            code: 200,
            message: '登录成功',
            data: {
                username: 'admin',
                token: 'sweitwbsladmin123'
            }
        }
    }
    else if(username==='manger'&&password=='manger123'){
        return {
            code: 200,
            message: '登录成功',
            data: {
                username: 'manger',
                token: 'sweitwbslmanger123'
            }
        }
    }
    else{
        return {
            code: 400,
            message: '登录失败',
            data: ''
        }
    }
});
