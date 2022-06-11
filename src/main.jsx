import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import store from './app-redux/index';
import './index.css';
import moment from 'moment';
import 'moment/locale/vi';
import locale from 'antd/lib/locale/vi_VN';
moment.locale('vi');

ReactDOM.createRoot(document.getElementById('root')).render(
    <ConfigProvider locale={locale}>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </ConfigProvider>
);
