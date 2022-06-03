import React from "react";
import { SettingActions } from "@/app-redux/settings";
import { useSelector, useDispatch } from "react-redux";

const NoHeaderNotification = () => {
  const settings = useSelector((state) => state.settings);
  const { navCollapsed } = settings;

  const dispatch = useDispatch();

  return (
    <div className="gx-no-header-horizontal">
      <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
        <i
          className="gx-icon-btn icon icon-menu"
          onClick={() => {
            dispatch(SettingActions.toggleCollapsedSideNav(!navCollapsed));
          }}
        />
      </div>
      <div className="gx-no-header-horizontal-top">
        <div className="gx-no-header-horizontal-top-center">
          <i className="icon icon-alert gx-mr-3" />
          <p className="gx-mb-0 gx-text-truncate">
            A new version will be released on December 25th. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoHeaderNotification;
