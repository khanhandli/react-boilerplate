import config from '@/config';
import LoginPage from '../features/auth/login';
import RegisterPage from '../features/auth/register';
import HomePage from '../features/home';
import TodoPage from '../features/todos/page';
import NodesPage from '../features/notes/page';

// Layouts

// Pages

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: HomePage },
    { path: config.routes.todo, component: TodoPage },
    { path: config.routes.notes, component: NodesPage },
];

const authRoutes = [
    {
        path: config.routes.home,
        component: LoginPage,
        auth: true,
    },
    {
        path: config.routes.login,
        component: LoginPage,
        auth: true,
    },
    {
        path: config.routes.register,
        component: RegisterPage,
        auth: true,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes, authRoutes };
