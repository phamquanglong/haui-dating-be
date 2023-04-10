import { AuthenticateRoute } from "../components/AuthenticateRoute";
import Login from "../screens/Auth/Login";
import Register from "../screens/Auth/Register";
import Home from "../screens/Home/Home";
import Profile from "../screens/Profile/Profile";
import { PRIVATE_ROUTE, PUBLIC_ROUTE } from "./constant";

export interface IRouteConfig {
  path: string;
  component: JSX.Element;
}

export const routes: IRouteConfig[] = [
  {
    path: "/",
    component: (
      <AuthenticateRoute type={PRIVATE_ROUTE}>
        <Home />
      </AuthenticateRoute>
    ),
  },
  {
    path: "/profile",
    component: (
      <AuthenticateRoute type={PRIVATE_ROUTE}>
        <Profile />
      </AuthenticateRoute>
    ),
  },
  {
    path: "/login",
    component: (
      <AuthenticateRoute type={PUBLIC_ROUTE}>
        <Login />
      </AuthenticateRoute>
    ),
  },
  {
    path: "/register",
    component: (
      <AuthenticateRoute type={PUBLIC_ROUTE}>
        <Register />
      </AuthenticateRoute>
    ),
  },
];
