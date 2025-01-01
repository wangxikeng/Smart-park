
import './mockjs'
import {Provider} from "react-redux";
import {store} from "./store";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './mockjs'
import {ConfigProvider} from "antd";
import locale from 'antd/locale/zh_CN';
createRoot(document.getElementById('root')!).render(
    <ConfigProvider locale={locale}>
    <Provider store={store}>
            <App />
    </Provider>
    </ConfigProvider>
)
