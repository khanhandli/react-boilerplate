import React, { Component } from "react";
import { Layout } from "antd";

import Sidebar from "./Sidebar/index";
import HorizontalDefault from "./Topbar/HorizontalDefault/index";
import HorizontalDark from "./Topbar/HorizontalDark/index";
import InsideHeader from "./Topbar/InsideHeader/index";
import AboveHeader from "./Topbar/AboveHeader/index";
import BelowHeader from "./Topbar/BelowHeader/index";

import Topbar from "./Topbar/index";
import { useDispatch, useSelector } from "react-redux";

import NoHeaderNotification from "./Topbar/NoHeaderNotification/index";
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
} from "@/app-constants/ThemeSettings";
import { SettingActions } from "@/app-redux/settings";
import Customizer from "./Customizer";

const { Content, Footer } = Layout;

function AppLayout({ children }) {
  const settings = useSelector((state) => state.settings);

  const { width, navStyle } = settings;

  const dispatch = useDispatch();

  const getContainerClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-container-wrap";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-container-wrap";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-container-wrap";
      default:
        return "";
    }
  };
  const getNavStyles = (navStyle) => {
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
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  const getSidebar = (navStyle, width) => {
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
  };

  React.useEffect(() => {
    dispatch(SettingActions.updateWindowWidth(window.innerWidth));
  }, []);

  return (
    <Layout className="gx-app-layout">
      {getSidebar(navStyle, width)}
      <Layout>
        {getNavStyles(navStyle)}
        <Content
          className={`gx-layout-content ${getContainerClass(navStyle)} `}
        >
          <div className="gx-main-content-wrapper">{children}</div>
          <Footer>
            <div className="gx-layout-footer-content">
              <div className="gx-layout-footer-content">
                Nguyễn Như Ý - NhuYdev - 2022
              </div>
            </div>
          </Footer>
        </Content>
      </Layout>
      <Customizer />
    </Layout>
  );
}

export default AppLayout;
