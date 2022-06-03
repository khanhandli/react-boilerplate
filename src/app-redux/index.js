import { createStore } from "redux-dynamic-modules";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import { getSettingsModule } from "./settings";
import { getAuthModule } from "./auth";

const store = createStore(
  {
    extensions: [getThunkExtension()],
  },
  getSettingsModule(),
  getAuthModule()
);

export default store;
