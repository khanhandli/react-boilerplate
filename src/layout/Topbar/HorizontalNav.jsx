import React from "react";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "@/app-constants/ThemeSettings";
import AppLink from "@/components/AppLink";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const getNavStyleSubMenuClass = (navStyle) => {
  switch (navStyle) {
    case NAV_STYLE_DEFAULT_HORIZONTAL:
      return "gx-menu-horizontal gx-submenu-popup-curve";
    case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
      return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
    case NAV_STYLE_BELOW_HEADER:
      return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
    case NAV_STYLE_ABOVE_HEADER:
      return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
    default:
      return "gx-menu-horizontal";
  }
};

function HorizontalNav() {
  const settings = useSelector((state) => state.settings);
  const user = useSelector((state) => state?.auth?.user);

  const { pathname, navStyle } = settings;

  const selectedKeys = pathname.substr(1);

  const defaultOpenKeys = selectedKeys.split("/")[1];

  return (
    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal"
    >
      <SubMenu
        className={() => getNavStyleSubMenuClass(navStyle)}
        key="main"
        title="Trang chủ"
      >
        <SubMenu
          className="gx-menu-horizontal"
          key=""
          title={
            <span>
              <i className="icon icon-dasbhoard" />
              Dashboard
            </span>
          }
        >
          <Menu.Item key="main/dashboard/crypto">
            <AppLink href="/main/dashboard/crypto">
              <div>
                <i className="icon icon-crypto" />
                Crypto
              </div>
            </AppLink>
          </Menu.Item>
          <Menu.Item key="main/dashboard/crm">
            <AppLink href="/main/dashboard/crm">
              <div>
                <i className="icon icon-crm" />
                Crm
              </div>
            </AppLink>
          </Menu.Item>
          <Menu.Item key="main/dashboard/listing">
            <AppLink href="/main/dashboard/listing">
              <div>
                <i className="icon icon-listing-dbrd" />
                Lisyting
              </div>
            </AppLink>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key="main/widgets">
          <AppLink href="/main/widgets">
            <div>
              <i className="icon icon-widgets" />
              widgets
            </div>
          </AppLink>
        </Menu.Item>

        <Menu.Item key="main/metrics">
          <AppLink href="/main/metrics">
            <div>
              <i className="icon icon-apps" />
              metrics
            </div>
          </AppLink>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

export default HorizontalNav;
