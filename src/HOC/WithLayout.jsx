import React from "react";
import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from "@/app-constants/ThemeSettings";
import Layout from "@/layout";
import { useSelector } from "react-redux";

function WithLayout(PageContent) {
  return function Page(props) {
    const settings = useSelector((state) => state?.settings);
    const { layoutType, navStyle, locale, authUser, initURL } = settings;

    const setLayoutType = (layoutType) => {
      if (layoutType === LAYOUT_TYPE_FULL) {
        document.body.classList.remove("boxed-layout");
        document.body.classList.remove("framed-layout");
        document.body.classList.add("full-layout");
      } else if (layoutType === LAYOUT_TYPE_BOXED) {
        document.body.classList.remove("full-layout");
        document.body.classList.remove("framed-layout");
        document.body.classList.add("boxed-layout");
      } else if (layoutType === LAYOUT_TYPE_FRAMED) {
        document.body.classList.remove("boxed-layout");
        document.body.classList.remove("full-layout");
        document.body.classList.add("framed-layout");
      }
    };

    const setNavStyle = (navStyle) => {
      if (
        navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
        navStyle === NAV_STYLE_DARK_HORIZONTAL ||
        navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
        navStyle === NAV_STYLE_ABOVE_HEADER ||
        navStyle === NAV_STYLE_BELOW_HEADER
      ) {
        document.body.classList.add("full-scroll");
        document.body.classList.add("horizontal-layout");
      } else {
        document.body.classList.remove("full-scroll");
        document.body.classList.remove("horizontal-layout");
      }
    };

    React.useEffect(() => {
      setLayoutType(layoutType);
      setNavStyle(navStyle);
    }, [layoutType, navStyle]);

    return (
      <Layout>
        <PageContent {...props} />
      </Layout>
    );
  };
}

export default WithLayout;
