
import Mock from 'mockjs';
// 配置 mock 数据
Mock.mock('https://www.testdemo/login', 'post', () => {
    console.log('Mock request triggered');
    return {
        code: 200,
        message: '登录成功',
        data: {
            userName: 'admin',
            token: 'sweitwbsl'
        }
    };
});
