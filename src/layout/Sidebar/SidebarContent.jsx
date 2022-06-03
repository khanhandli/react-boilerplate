import React, { useEffect } from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import CustomScrollbars from "@/components/CustomScrollbars";

import AppLink from "@/components/AppLink";

import { SettingActions } from "@/app-redux/settings";
import Auxiliary from "@/components/Auxiliary";
import SidebarLogo from "./SidebarLogo";
import UserProfile from "./UserProfile";
import AppsNavigation from "./AppsNavigation";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from "@/app-constants/ThemeSettings";
import { useLocation } from "react-router-dom";

const items = [
  {
    label: "Trang chủ",
    type: "group",
    children: [
      {
        label: "Dashboard",
        key: "main/dashboard",
        icon: <i className="icon icon-dasbhoard" />,
        children: [
          {
            label: "Crypto",
            key: "main/dashboard/crypto",
            icon: <i className="icon icon-crypto" />,
          },
          {
            label: "CRM",
            key: "main/dashboard/crm",
            icon: <i className="icon icon-crypto" />,
          },
          {
            label: "Listing",
            key: "main/dashboard/listing",
            icon: <i className="icon icon-crypto" />,
          },
        ],
      },
      {
        label: "Mạng xã hội",
        key: "main/personal",
        icon: <i className="icon icon-widgets" />,
      },
      {
        label: "QL công việc",
        key: "main/todo",
        icon: <i className="icon icon-check-square-o" />,
      },
    ],
  },
];

function SidebarContent() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state?.auth?.user);
  const settings = useSelector((state) => state.settings);
  const { themeType, navStyle, pathname } = settings;

  useEffect(() => {
    dispatch(SettingActions.setPathname(location.pathname));
  }, [location.pathname, dispatch]);

  const getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR ||
      navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  const getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split("/")[1] || "dashboard";

  return (
    <Auxiliary>
      <SidebarLogo />
      <div className="gx-sidebar-content">
        <div
          className={`gx-sidebar-notifications ${getNoHeaderClass(navStyle)}`}
        >
          <UserProfile />
          <AppsNavigation />
        </div>
        <CustomScrollbars className="gx-layout-sider-scrollbar">
          <div className="gx-menu-group">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? "lite" : "dark"}
              mode="inline"
              items={items}
              onClick={(e) => location.push("/" + e.key)}
            />
          </div>
        </CustomScrollbars>
      </div>
    </Auxiliary>
  );
}

export default SidebarContent;
