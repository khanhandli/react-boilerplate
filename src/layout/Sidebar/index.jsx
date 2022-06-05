import {
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE,
    THEME_TYPE_LITE,
} from '@/app-constants/ThemeSettings';
import { SettingActions } from '@/app-redux/settings';
import { Drawer, Layout } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SidebarContent from './SidebarContent';

const Sidebar = () => {
    const location = useLocation();

    const dispatch = useDispatch();
    const settings = useSelector((state) => state.settings);
    const { themeType, navStyle, navCollapsed, width, pathname } = settings;

    const onToggleCollapsedNav = () => {
        dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
    };

    useEffect(() => {
        const onResize = () => {
            dispatch(SettingActions.updateWindowWidth(window.innerWidth));
        };
        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        };
    }, [dispatch]);

    useEffect(() => {
        if (location.pathname === pathname) {
            dispatch(SettingActions.toggleCollapsedSideNav(false));
        }
    }, [pathname, dispatch, location.pathname]);

    let drawerStyle = 'gx-collapsed-sidebar';

    if (navStyle === NAV_STYLE_FIXED) {
        drawerStyle = '';
    } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
        drawerStyle = 'gx-mini-sidebar gx-mini-custom-sidebar';
    } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
        drawerStyle = 'gx-custom-sidebar';
    } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
        drawerStyle = 'gx-mini-sidebar';
    } else if (navStyle === NAV_STYLE_DRAWER) {
        drawerStyle = 'gx-collapsed-sidebar';
    }
    if (
        (navStyle === NAV_STYLE_FIXED ||
            navStyle === NAV_STYLE_MINI_SIDEBAR ||
            navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) &&
        width < TAB_SIZE
    ) {
        drawerStyle = 'gx-collapsed-sidebar';
    }

    return (
        <Layout.Sider
            className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
            trigger={null}
            collapsed={
                width < TAB_SIZE
                    ? false
                    : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR
            }
            theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
            collapsible
        >
            {navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ? (
                <Drawer
                    className={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
                    placement="left"
                    closable={false}
                    onClose={onToggleCollapsedNav}
                    visible={navCollapsed}
                >
                    <SidebarContent />
                </Drawer>
            ) : (
                <SidebarContent />
            )}
        </Layout.Sider>
    );
};

export default Sidebar;
