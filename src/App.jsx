import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AuthActions } from './app-redux/auth';
import ErrorPage from './components/ErrorPage';
import WithLayout from './HOC/withLayout';
import { authRoutes, publicRoutes } from './routes';
import CircularProgress from '@/components/CircularProgress';

function App() {
    const auth = useSelector((state) => state.auth);
    const naviagate = useNavigate();
    const dispatch = useDispatch();
    const { token } = auth;
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const rf_token = localStorage.getItem('rf_token');
        if (rf_token && !token) {
            dispatch(AuthActions.loginWithToken(rf_token));
        }

        if (!token && !rf_token) {
            naviagate('/login');
        }
        const timeOutLoading = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeOutLoading);
    }, [token]);

    return loading ? (
        <div style={{ height: '100vh' }} className="gx-loader-view">
            <CircularProgress />
        </div>
    ) : (
        <Routes>
            {(token ? publicRoutes : authRoutes).map((route, index) => {
                let Page = route.component;
                if (!route.auth) {
                    Page = WithLayout(route.component);
                }

                return <Route key={index} path={route.path} element={<Page />} />;
            })}
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    );
}

export default App;
