const SET_WINDOW_WIDTH = "set_window_width";
const TOGGLE_COLLAPSED_NAV = "toggle_collapsed_nav";
const SWITCH_LANGUAGE = "switch_language";
const SET_PATH_NAME = "set_path_name";
const NAV_STYLE_CHANGE = "nav_style_change";
const SET_THEME_TYPE = "set_theme_type";
const SET_THEME_COLOR_SELECTION = "set_theme_color_selection";
const LAYOUT_TYPE_CHANGE = "layout_type_change";

const SettingActions = {
  updateWindowWidth(width) {
    return { type: SET_WINDOW_WIDTH, payload: width };
  },
  toggleCollapsedSideNav(navCollapsed) {
    return { type: TOGGLE_COLLAPSED_NAV, payload: navCollapsed };
  },
  switchLanguage(locale) {
    return { type: SWITCH_LANGUAGE, payload: locale };
  },
  setPathname(path) {
    return { type: SET_PATH_NAME, payload: path };
  },
  onNavStyleChange(navStyle) {
    return { type: NAV_STYLE_CHANGE, payload: navStyle };
  },
  setThemeType(themeType) {
    return { type: SET_THEME_TYPE, payload: themeType };
  },
  setThemeColorSelection(colorSelection) {
    return { type: SET_THEME_COLOR_SELECTION, payload: colorSelection };
  },
  onLayoutTypeChange(layoutType) {
    return { type: LAYOUT_TYPE_CHANGE, payload: layoutType };
  },
};

const initialState = {
  navCollapsed: false,
  navStyle: "NAV_STYLE_FIXED",
  layoutType: "LAYOUT_TYPE_FULL",
  themeType: "THEME_TYPE_SEMI_DARK",
  colorSelection: "THEME_COLOR_SELECTION_PRESET",
  pathname: "",
  width: 1366,
  locale: {
    languageId: "english",
    locale: "en",
    name: "English",
    icon: "us",
  },
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_WINDOW_WIDTH:
      return { ...state, width: action.payload };
    case TOGGLE_COLLAPSED_NAV:
      return { ...state, navCollapsed: action.payload };
    case SWITCH_LANGUAGE:
      return { ...state, locale: action.payload };
    case SET_PATH_NAME:
      return { ...state, pathname: action.payload };
    case NAV_STYLE_CHANGE:
      return { ...state, navStyle: action.payload };
    case SET_THEME_TYPE:
      return { ...state, themeType: action.payload };
    case SET_THEME_COLOR_SELECTION:
      return { ...state, colorSelection: action.payload };
    case LAYOUT_TYPE_CHANGE:
      return { ...state, layoutType: action.payload };
    default:
      return state;
  }
}

function getSettingsModule() {
  return {
    id: "settings",
    reducerMap: { settings: reducer },
  };
}

export { SettingActions, getSettingsModule };
