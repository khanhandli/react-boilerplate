import { THEME_TYPE_LITE } from '@/app-constants/ThemeSettings';
import { Menu } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const items = [
    {
        label: 'Trang chủ',
        key: '/',
        children: [
            {
                label: 'Dashboard',
                key: 'main/dashboard',
                icon: <i className="icon icon-dasbhoard" />,
                children: [
                    {
                        label: 'Crypto',
                        key: 'main/dashboard/crypto',
                        icon: <i className="icon icon-crypto" />,
                    },
                    {
                        label: 'CRM',
                        key: 'main/dashboard/crm',
                        icon: <i className="icon icon-crypto" />,
                    },
                    {
                        label: 'Listing',
                        key: 'main/dashboard/listing',
                        icon: <i className="icon icon-crypto" />,
                    },
                ],
            },
            {
                label: 'QL công việc',
                key: 'main/todo',
                icon: <i className="icon icon-check-square-o" />,
            },
            {
                label: 'Mạng xã hội',
                key: 'main/personal',
                icon: <i className="icon icon-widgets" />,
            },
        ],
    },
];

function HorizontalNav() {
    const naviagate = useNavigate();

    const { auth, settings } = useSelector((state) => state);
    const { themeType, navStyle, pathname } = settings;

    const selectedKeys = pathname.substr(1) || '/';

    const defaultOpenKeys = selectedKeys.split('/')[1];

    return (
        <Menu
            mode="horizontal"
            defaultOpenKeys={[defaultOpenKeys]}
            selectedKeys={[selectedKeys]}
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            items={items}
            onClick={(e) => naviagate('/' + e.key)}
        />
    );
}

export default HorizontalNav;
