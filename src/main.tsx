
import './mockjs'
import {Provider} from "react-redux";
import {store} from "./store";
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './mockjs'
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
            <App />
    </Provider>
)
