import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { ConfigProvider } from 'antd';
import updateLocale from "dayjs/plugin/updateLocale";
import locale from "antd/es/locale/ru_RU";

dayjs.extend(updateLocale);
dayjs.updateLocale("zh-cn", {
  weekStart: 1
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <BrowserRouter>
    <ConfigProvider locale={locale}>
    <App />
    </ConfigProvider>
    </BrowserRouter>
    </>
);


