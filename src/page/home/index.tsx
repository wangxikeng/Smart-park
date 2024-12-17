import  {useState} from "react";
import MyMenu from '../../component/Menu'
import { Layout,} from 'antd';
import MyHeader from "../../component/Header";
import MyBreadCrumb from "../../component/Breadcrumb";
const { Header, Content, Footer, Sider } = Layout;

const Home=()=>{

    const [collapsed, setCollapsed] = useState(false);

    return <>
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
              <MyMenu/>
            </Sider>
            <Layout>
                <Header style={{ padding: 0,}} >
                    <MyHeader></MyHeader>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <MyBreadCrumb></MyBreadCrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                        }}
                    >
                        Bill is a cat.
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
