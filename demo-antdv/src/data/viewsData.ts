const modulesFiles = require.context("../views", true, /index.vue/);
const menus: any = {};
const allRoutes: any[] = [];
const base = window.__MICRO_APP_BASE_ROUTE__ || "";

modulesFiles
  .keys()
  .sort((a: string, b: string) => a.length - b.length)
  .forEach((path: string) => {
    const pathName = path.slice(2, path.length - 10);
    const pathNameArr: any[] = pathName.split("/");
    if (pathNameArr.length === 1) {
      // 无子菜单
      menus[pathNameArr[0]] = true;
      const name = pathNameArr[0];
      allRoutes.push({
        path: name === "home" ? "/" : `/${name}`,
        component: modulesFiles(path).default,
      });
    } else {
      // 有子菜单
      if (!Object.prototype.hasOwnProperty.call(menus, pathNameArr[0])) {
        menus[pathNameArr[0]] = {
          children: [],
        };
      }
      menus[pathNameArr[0]].children.push({
        name: pathNameArr[1],
        // component:
      });
      allRoutes.push({
        path: `/${pathNameArr[0]}/${pathNameArr[1]}`,
        component: modulesFiles(path).default,
      });
    }
  });

export { menus, allRoutes, base };
