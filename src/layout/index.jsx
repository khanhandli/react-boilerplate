import {
    NAV_STYLE_ABOVE_HEADER,
    NAV_STYLE_BELOW_HEADER,
    NAV_STYLE_DARK_HORIZONTAL,
    NAV_STYLE_DEFAULT_HORIZONTAL,
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE,
} from '@/app-constants/ThemeSettings';
import { SettingActions } from '@/app-redux/settings';
import { Layout } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Customizer from './Customizer';
import Sidebar from './Sidebar/index';
import AboveHeader from './Topbar/AboveHeader/index';
import BelowHeader from './Topbar/BelowHeader/index';
import HorizontalDark from './Topbar/HorizontalDark/index';
import HorizontalDefault from './Topbar/HorizontalDefault/index';
import Topbar from './Topbar/index';
import InsideHeader from './Topbar/InsideHeader/index';
import NoHeaderNotification from './Topbar/NoHeaderNotification/index';

const { Content, Footer } = Layout;

function AppLayout({ children }) {
    const { settings, auth } = useSelector((state) => state);

    const { user } = auth;
    const { width, navStyle } = settings;

    const dispatch = useDispatch();

    const getContainerClass = React.useCallback((navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DARK_HORIZONTAL:
                return 'gx-container-wrap';
            case NAV_STYLE_DEFAULT_HORIZONTAL:
                return 'gx-container-wrap';
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
                return 'gx-container-wrap';
            case NAV_STYLE_BELOW_HEADER:
                return 'gx-container-wrap';
            case NAV_STYLE_ABOVE_HEADER:
                return 'gx-container-wrap';
            default:
                return '';
        }
    }, []);

    const getNavStyles = React.useCallback((navStyle) => {
        switch (navStyle) {
            case NAV_STYLE_DEFAULT_HORIZONTAL:
                return <HorizontalDefault />;
            case NAV_STYLE_DARK_HORIZONTAL:
                return <HorizontalDark />;
            case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
                return <InsideHeader />;
            case NAV_STYLE_ABOVE_HEADER:
                return <AboveHeader />;
            case NAV_STYLE_BELOW_HEADER:
                return <BelowHeader />;
            case NAV_STYLE_FIXED:
                return user.isEmailVerified ? <Topbar /> : <NoHeaderNotification />;
            case NAV_STYLE_DRAWER:
                return user.isEmailVerified ? <Topbar /> : <NoHeaderNotification />;
            case NAV_STYLE_MINI_SIDEBAR:
                return user.isEmailVerified ? <Topbar /> : <NoHeaderNotification />;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
                return <NoHeaderNotification />;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
                return <NoHeaderNotification />;
            default:
                return null;
        }
    }, []);

    const getSidebar = React.useCallback((navStyle, width) => {
        if (width < TAB_SIZE) {
            return <Sidebar />;
        }
        switch (navStyle) {
            case NAV_STYLE_FIXED:
                return <Sidebar />;
            case NAV_STYLE_DRAWER:
                return <Sidebar />;
            case NAV_STYLE_MINI_SIDEBAR:
                return <Sidebar />;
            case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
                return <Sidebar />;
            case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
                return <Sidebar />;
            default:
                return null;
        }
    }, []);

    React.useEffect(() => {
        dispatch(SettingActions.updateWindowWidth(window.innerWidth));
    }, []);

    return (
        <Layout className="gx-app-layout">
            {getSidebar(navStyle, width)}
            <Layout>
                {getNavStyles(navStyle)}
                <Content className={`gx-layout-content ${getContainerClass(navStyle)} `}>
                    <div className="gx-main-content-wrapper">{children}</div>
                    <Footer>
                        <div className="gx-layout-footer-content">
                            <div className="gx-layout-footer-content">Nguyễn Như Ý - NhuYdev - 2022</div>
                        </div>
                    </Footer>
                </Content>
            </Layout>
            <Customizer />
        </Layout>
    );
}

export default AppLayout;
