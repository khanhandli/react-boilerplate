import { SettingActions } from '@/app-redux/settings';
import Logo from '@/assets/images/logo.png';
import wLogo from '@/assets/images/w-logo.png';
import AppLink from '@/components/AppLink';
import AppNotification from '@/components/AppNotification';
import CustomScrollbars from '@/components/CustomScrollbars';
import MailNotification from '@/components/MailNotification';
import SearchBox from '@/components/SearchBox';
import { Button, Dropdown, Layout, Menu, message, Popover } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalNav from '../HorizontalNav';
import languageData from '../languageData';
import UserInfo from '../UserInfo';

const { Header } = Layout;

const menu = (
    <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">Products</Menu.Item>
        <Menu.Item key="2">Apps</Menu.Item>
        <Menu.Item key="3">Blogs</Menu.Item>
    </Menu>
);

function handleMenuClick(e) {
    message.info('Click on menu item.');
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
const InsideHeader = () => {
    const settings = useSelector((state) => state.settings);
    const { locale, navCollapsed } = settings;
    const dispatch = useDispatch();

    const [searchText, setSearchText] = React.useState('');

    const languageMenu = () => (
        <CustomScrollbars className="gx-popover-lang-scroll">
            <ul className="gx-sub-popover">
                {languageData.map((language) => (
                    <li className="gx-media gx-pointer" key={JSON.stringify(language)}>
                        <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
                        <span className="gx-language-text">{language.name}</span>
                    </li>
                ))}
            </ul>
        </CustomScrollbars>
    );

    const updateSearchChatUser = (evt) => {
        setSearchText(evt.target.value);
    };

    return (
        <div className="gx-header-horizontal gx-header-horizontal-dark gx-inside-header-horizontal">
            <div className="gx-header-horizontal-top">
                <div className="gx-container">
                    <div className="gx-header-horizontal-top-flex">
                        <div className="gx-header-horizontal-top-left gx-d-flex gx-align-items-center">
                            <i className="icon icon-alert gx-mr-3" />
                            <p className="gx-mb-0 gx-text-truncate gx-d-flex gx-align-items-center">
                                <div>Tài khoản của bạn chưa xác thực!</div>{' '}
                                <Button className="gx-mb-0 " type="link">
                                    <span className="gx-text-underline">Xác thực ngay</span>
                                </Button>
                            </p>
                        </div>
                        <ul className="gx-login-list">
                            <li>Login</li>
                            <li>Signup</li>
                        </ul>
                    </div>
                </div>
            </div>

            <Header className="gx-header-horizontal-main">
                <div className="gx-container">
                    <div className="gx-header-horizontal-main-flex">
                        <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3 6e">
                            <i
                                className="gx-icon-btn icon icon-menu"
                                onClick={() => {
                                    dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
                                }}
                            />
                        </div>
                        <AppLink
                            href="/"
                            className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo"
                        >
                            <img alt="" src={wLogo} />
                        </AppLink>
                        <AppLink href="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo">
                            <img alt="" src={Logo} />
                        </AppLink>

                        <div className="gx-header-horizontal-nav gx-header-horizontal-nav-curve gx-d-none gx-d-lg-block">
                            <HorizontalNav />
                        </div>
                        <ul className="gx-header-notifications gx-ml-auto">
                            <li className="gx-notify gx-notify-search">
                                <Popover
                                    overlayClassName="gx-popover-horizantal"
                                    placement="bottomRight"
                                    content={
                                        <div className="gx-d-flex">
                                            <Dropdown overlay={menu}>
                                                <Button>Category</Button>
                                            </Dropdown>
                                            <SearchBox
                                                styleName="gx-popover-search-bar"
                                                placeholder="Search in app..."
                                                onChange={updateSearchChatUser}
                                                value={searchText}
                                            />
                                        </div>
                                    }
                                    trigger="click"
                                >
                                    <span className="gx-pointer gx-d-block">
                                        <i className="icon icon-search-new" />
                                    </span>
                                </Popover>
                            </li>

                            <li className="gx-notify">
                                <Popover
                                    overlayClassName="gx-popover-horizantal"
                                    placement="bottomRight"
                                    content={<AppNotification />}
                                    trigger="click"
                                >
                                    <span className="gx-pointer gx-d-block">
                                        <i className="icon icon-notification" />
                                    </span>
                                </Popover>
                            </li>

                            <li className="gx-msg">
                                <Popover
                                    overlayClassName="gx-popover-horizantal"
                                    placement="bottomRight"
                                    content={<MailNotification />}
                                    trigger="click"
                                >
                                    <span className="gx-pointer gx-status-pos gx-d-block">
                                        <i className="icon icon-chat-new" />
                                        <span className="gx-status gx-status-rtl gx-small gx-orange" />
                                    </span>
                                </Popover>
                            </li>
                            <li className="gx-language">
                                <Popover
                                    overlayClassName="gx-popover-horizantal"
                                    placement="bottomRight"
                                    content={languageMenu}
                                    trigger="click"
                                >
                                    <span className="gx-pointer gx-flex-row gx-align-items-center">
                                        <i className={`flag flag-24 flag-${locale.icon}`} />
                                    </span>
                                </Popover>
                            </li>
                            <li className="gx-user-nav">
                                <UserInfo />
                            </li>
                        </ul>
                    </div>
                </div>
            </Header>
        </div>
    );
};

export default InsideHeader;
