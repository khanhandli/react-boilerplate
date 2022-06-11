import { postDataAPI } from '@/apis';
import { Notification, Action } from '@/utils';

const AUTH_SET_USER = 'auth_set_user';
const AUTH_SET_LOADING = 'auth_set_loading';
const AUTH_LOGIN = 'auth_login';
const AUTH_LOGIN_WITH_TOKEN = 'auth_login_with_token';
const AUTH_LOGOUT = 'auth_logout';
const VERIFY_EMAIL = 'verify_email';
export const SET_SOCKET = 'set_socket';

const AuthActions = {
    setUser(user) {
        return { type: AUTH_SET_USER, payload: user };
    },
    setLoading(loading) {
        return { type: AUTH_SET_LOADING, payload: loading };
    },
    register:
        ({ name, role, email, password } = {}) =>
        async (dispatch) => {
            try {
                dispatch(Action(AUTH_SET_LOADING, true));
                const res = await postDataAPI(`v1/auth/register`, {
                    name,
                    email,
                    password,
                });
                if (res.status === 201) {
                    Notification('success', res.data.message);
                    dispatch({ type: AUTH_LOGIN, payload: res.data });
                    dispatch(Action(AUTH_SET_LOADING, false));
                    localStorage.setItem('rf_token', res.data.tokens.refresh.token);
                }
            } catch (error) {
                Notification('error', error);
                dispatch(Action(AUTH_SET_LOADING, false));
            }
        },
    login:
        ({ email, password } = {}) =>
        async (dispatch) => {
            try {
                dispatch(Action(AUTH_SET_LOADING, true));
                const res = await postDataAPI(`v1/auth/login`, {
                    email,
                    password,
                });
                console.log('🚀 ~ file: index.js ~ line 49 ~ res', res);
                if (res.status === 200) {
                    Notification('success', res.data.message);
                    dispatch({ type: AUTH_LOGIN, payload: res.data });
                    dispatch(Action(AUTH_SET_LOADING, false));
                    localStorage.setItem('rf_token', res.data.tokens.refresh.token);
                }
            } catch (error) {
                console.log('🚀 ~ file: index.js ~ line 36 ~ error', error);
                Notification('error', error);
                dispatch(Action(AUTH_SET_LOADING, false));
            }
        },
    loginWithToken: (rf_token) => async (dispatch) => {
        try {
            dispatch(Action(AUTH_SET_LOADING, true));
            const res = await postDataAPI(`v1/auth/refresh-tokens`, {
                refreshToken: rf_token,
            });
            if (res.status === 200) {
                dispatch({ type: AUTH_LOGIN_WITH_TOKEN, payload: res.data });
                dispatch(Action(AUTH_SET_LOADING, false));
                localStorage.setItem('rf_token', res.data.refresh.token);
            }
        } catch (error) {
            Notification('error', error);
            dispatch(Action(AUTH_SET_LOADING, false));
            localStorage.removeItem('rf_token');
        }
    },
    logout: () => async (dispatch) => {
        try {
            const rf_token = localStorage.getItem('rf_token');
            dispatch(Action(AUTH_SET_LOADING, true));
            const res = await postDataAPI(`v1/auth/logout`, {
                refreshToken: rf_token,
            });
            if (res.status === 200) {
                dispatch({ type: AUTH_LOGOUT, payload: {} });
                dispatch(Action(AUTH_SET_LOADING, false));
                localStorage.removeItem('rf_token');
            }
        } catch (error) {
            Notification('error', error);
            dispatch(Action(AUTH_SET_LOADING, false));
        }
    },
};

const initialState = {
    user: {},
    token: '',
    loading: false,
    socket: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SET_USER:
            return { ...state, user: action.payload };
        case AUTH_SET_LOADING:
            return { ...state, loading: action.payload };
        case AUTH_LOGIN:
            return { ...state, token: action.payload.tokens.access.token, user: action.payload.user };
        case AUTH_LOGIN_WITH_TOKEN:
            return { ...state, token: action.payload.access.token, user: action.payload.user };
        case AUTH_LOGOUT:
            return { ...state, ...initialState };
        case VERIFY_EMAIL:
            return { ...state, user: { ...state.user, isEmailVerified: action.payload } };
        case SET_SOCKET:
            return { ...state, socket: action.payload };
        default:
            return state;
    }
}

function getAuthModule() {
    return {
        id: 'auth',
        reducerMap: { auth: reducer },
    };
}

export { AuthActions, getAuthModule };
