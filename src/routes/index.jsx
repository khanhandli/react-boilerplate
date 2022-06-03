import config from "@/config";
import LoginPage from "../features/auth/login";
import HomePage from "../features/home";

// Layouts

// Pages

// Public routes
const publicRoutes = [
  { path: config.routes.home, component: HomePage },
  {
    path: config.routes.login,
    component: LoginPage,
    auth: true,
  },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
