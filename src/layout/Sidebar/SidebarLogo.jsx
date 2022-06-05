import {
    NAV_STYLE_DRAWER,
    NAV_STYLE_FIXED,
    NAV_STYLE_MINI_SIDEBAR,
    NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
    TAB_SIZE,
    THEME_TYPE_LITE,
} from '@/app-constants/ThemeSettings';
import { SettingActions } from '@/app-redux/settings';
import logoWhite from '@/assets/images/logo-white.png';
import logo from '@/assets/images/logo.png';
import Wlogo from '@/assets/images/w-logo.png';
import AppLink from '@/components/AppLink';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SidebarLogo = () => {
    const settings = useSelector((state) => state.settings);
    const { width, themeType, navCollapsed, navStyle } = settings;
    const dispatch = useDispatch();

    let cloneNavStyle = navStyle;

    if (width < TAB_SIZE && cloneNavStyle === NAV_STYLE_FIXED) {
        cloneNavStyle = NAV_STYLE_DRAWER;
    } else {
        cloneNavStyle = navStyle;
    }
    return (
        <div className="gx-layout-sider-header">
            {cloneNavStyle === NAV_STYLE_FIXED || cloneNavStyle === NAV_STYLE_MINI_SIDEBAR ? (
                <div className="gx-linebar">
                    <i
                        className={`gx-icon-btn icon icon-${
                            cloneNavStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'
                        } ${themeType !== THEME_TYPE_LITE ? 'gx-text-white' : ''}`}
                        onClick={() => {
                            if (cloneNavStyle === NAV_STYLE_DRAWER) {
                                dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
                            } else if (cloneNavStyle === NAV_STYLE_FIXED) {
                                dispatch(SettingActions.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR));
                            } else if (cloneNavStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                                dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
                            } else {
                                dispatch(SettingActions.onNavStyleChange(NAV_STYLE_FIXED));
                            }
                        }}
                    />
                </div>
            ) : null}

            <AppLink className="gx-site-logo" href="/">
                {cloneNavStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ? (
                    <img alt="" src={Wlogo} />
                ) : themeType === THEME_TYPE_LITE ? (
                    <img alt="" src={logoWhite} />
                ) : (
                    <img alt="" src={logo} />
                )}
            </AppLink>
        </div>
    );
};

export default SidebarLogo;
