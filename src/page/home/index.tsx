import React, {useState} from "react";
import MyMenu from '../../component/Menu'
import {Layout, theme,} from 'antd';
import MyHeader from "../../component/Header";
import MyBreadCrumb from "../../component/Breadcrumb";
const { Header, Content, Footer, Sider } = Layout;
import {Outlet} from "react-router-dom";
const siderStyle: React.CSSProperties = {
    position: 'fixed',      // 固定位置
    top: 0,                 // 顶部对齐
    left: 0,                // 左侧对齐
    bottom: 0,              // 底部对齐
    zIndex: 999,            // 确保在其他内容上方
};
const Home=()=>{
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [collapsed, setCollapsed] = useState(false);

    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={siderStyle
            }>
              <MyMenu collapsed={collapsed}/>
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200,transition: 'margin-left 0.3s ease' }}>
                <Header style={{ paddingRight:' 20px',background: colorBgContainer,textAlign:"right" }} >
                    <MyHeader></MyHeader>
                </Header>
                <Content style={{ margin: '0 16px'  }}>
                    <MyBreadCrumb></MyBreadCrumb>
                    <div
                        style={{
                            paddingTop: 10,
                            minHeight: 360,
                        }}
                    >
                      <Outlet/>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    </>
}

export default Home
