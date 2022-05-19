import Home from "./pages/home";
import Login from "./pages/login";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
    key: "home",
  },
  {
    path: "/login",
    component: Login,
    exact: true,
    key: "login",
  },
];
