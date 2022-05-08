import { RouteRecordRaw } from "vue-router";
import { allRoutes, base } from "../data/viewsData";

const routes: RouteRecordRaw[] = allRoutes.map((route) => {
  return {
    path: `${base}${route.path}`,
    name: route.path,
    component: route.component,
  };
});

//  [
//   {
//     path: `${base}`,
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: `${base}about`,
//     name: "About",
//     component: () =>
//       import(/* webpackChunkName: "about" */ "../views/about/index.vue"),
//   },
// ];

export default routes;
