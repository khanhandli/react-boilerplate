import { createStore } from 'redux-dynamic-modules';
import { getThunkExtension } from 'redux-dynamic-modules-thunk';

import { getSettingsModule } from './settings';
import { getAuthModule } from './auth';
import { getNotesModule } from './notes';

const store = createStore(
    {
        extensions: [getThunkExtension()],
    },
    getSettingsModule(),
    getAuthModule(),
    getNotesModule()
);

export default store;
