import {
    LAYOUT_TYPE_BOXED,
    LAYOUT_TYPE_FRAMED,
    LAYOUT_TYPE_FULL,
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
    THEME_TYPE_DARK,
    THEME_TYPE_LITE,
    THEME_TYPE_SEMI_DARK,
} from '@/app-constants/ThemeSettings';
import { SettingActions } from '@/app-redux/settings';
import belowHeader from '@/assets/images/layouts/below-header.png';
import boxed from '@/assets/images/layouts/boxed.png';
import darkHorizontal from '@/assets/images/layouts/dark-horizontal.png';
import defaultHorizontal from '@/assets/images/layouts/default-horizontal.png';
import drawerNav from '@/assets/images/layouts/drawer-nav.png';
import fixedPng from '@/assets/images/layouts/fixed.png';
import framed from '@/assets/images/layouts/framed.png';
import fullWidth from '@/assets/images/layouts/full-width.png';
import inSideHeaderHorizontal from '@/assets/images/layouts/inside-header-horizontal.png';
import miniSidebar from '@/assets/images/layouts/mini-sidebar.png';
import headerMiniSidebar from '@/assets/images/layouts/no-header-mini-sidebar.png';
import topToHeader from '@/assets/images/layouts/top-to-header.png';
import verticalNoHeader from '@/assets/images/layouts/vertical-no-header.png';
import Auxiliary from '@/components/Auxiliary';
import CustomScrollbars from '@/components/CustomScrollbars';
import { Button, Drawer, message, Radio } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Customizer = () => {
    const [isCustomizerOpened, setIsCustomizerOpened] = React.useState(false);

    const settings = useSelector((state) => state.settings);
    const { themeType, navStyle, layoutType } = settings;

    const dispatch = useDispatch();

    const toggleCustomizer = () => {
        setIsCustomizerOpened(!isCustomizerOpened);
    };

    const onThemeTypeChange = (e) => {
        dispatch(SettingActions.setThemeType(e.target.value));
        // this.props.setThemeType(e.target.value);
    };

    const renderNavStyles = React.useCallback(
        (style, navStyle, img) => (
            <li>
                <span
                    onClick={() => {
                        dispatch(SettingActions.onNavStyleChange(style));
                    }}
                    className={`gx-pointer ${navStyle === style && 'active'}`}
                >
                    <img src={img} alt="fixed" />
                </span>
            </li>
        ),
        []
    );

    const getNavStyles = (navStyle) => {
        return (
            <ul className="gx-nav-option gx-list-inline">
                {renderNavStyles(NAV_STYLE_FIXED, navStyle, fixedPng)}
                {renderNavStyles(NAV_STYLE_MINI_SIDEBAR, navStyle, miniSidebar)}
                {renderNavStyles(NAV_STYLE_DRAWER, navStyle, drawerNav)}
                {renderNavStyles(NAV_STYLE_NO_HEADER_MINI_SIDEBAR, navStyle, headerMiniSidebar)}
                {renderNavStyles(NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR, navStyle, verticalNoHeader)}
                {renderNavStyles(NAV_STYLE_DEFAULT_HORIZONTAL, navStyle, defaultHorizontal)}
                {renderNavStyles(NAV_STYLE_DARK_HORIZONTAL, navStyle, darkHorizontal)}
                {renderNavStyles(NAV_STYLE_INSIDE_HEADER_HORIZONTAL, navStyle, inSideHeaderHorizontal)}
                {renderNavStyles(NAV_STYLE_BELOW_HEADER, navStyle, belowHeader)}
                {renderNavStyles(NAV_STYLE_ABOVE_HEADER, navStyle, topToHeader)}
            </ul>
        );
    };

    const renderLayoutsTypes = React.useCallback(
        (style, layoutType, img) => (
            <li>
                <span
                    onClick={() => {
                        dispatch(SettingActions.onLayoutTypeChange(style));
                    }}
                    className={`gx-pointer ${layoutType === style && 'active'}`}
                >
                    <img src={img} alt="fixed" />
                </span>
            </li>
        ),
        []
    );

    const getLayoutsTypes = (layoutType) => {
        return (
            <ul className="gx-layout-option gx-list-inline">
                {renderLayoutsTypes(LAYOUT_TYPE_FRAMED, layoutType, framed)}
                {renderLayoutsTypes(LAYOUT_TYPE_FULL, layoutType, fullWidth)}
                {renderLayoutsTypes(LAYOUT_TYPE_BOXED, layoutType, boxed)}
            </ul>
        );
    };

    React.useEffect(() => {
        if (themeType === THEME_TYPE_DARK) {
            document.body.classList.add('dark-theme');
        } else if (document.body.classList.contains('dark-theme')) {
            document.body.classList.remove('dark-theme');
        }
    }, [themeType]);

    // customize content
    const getCustomizerContent = () => {
        return (
            <CustomScrollbars className="gx-customizer">
                <div className="gx-customizer-item">
                    <h6 className="gx-mb-3 gx-text-uppercase">Giao diện</h6>
                    <Radio.Group value={themeType} onChange={onThemeTypeChange}>
                        <Radio.Button value={THEME_TYPE_LITE}>LITE</Radio.Button>
                        <Radio.Button value={THEME_TYPE_SEMI_DARK}>SEMI DARK</Radio.Button>
                        <Radio.Button value={THEME_TYPE_DARK}>DARK</Radio.Button>
                    </Radio.Group>
                </div>

                <h6 className="gx-mb-3 gx-text-uppercase">THANH ĐIỀU HƯỚNG</h6>

                {getNavStyles(navStyle)}

                <h6 className="gx-mb-3 gx-text-uppercase">BỐ CỤC</h6>

                {getLayoutsTypes(layoutType)}
            </CustomScrollbars>
        );
    };

    return (
        <Auxiliary>
            <Drawer placement="right" closable={false} onClose={toggleCustomizer} visible={isCustomizerOpened}>
                {getCustomizerContent()}
            </Drawer>
            <div className="gx-customizer-option">
                <Button type="primary" onClick={toggleCustomizer}>
                    <i className="icon icon-setting fxicon-hc-spin gx-d-block" />
                </Button>
            </div>
        </Auxiliary>
    );
};

export default Customizer;
