import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout, Menu, MenuProps } from "antd";

const { Sider, Content } = Layout;
// @ts-ignore
const modulesFiles = require.context("./pages", true, /index.tsx/);

const menus: any = {};
const routes: any[] = [];

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
      console.log(name);
      routes.push({
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
      routes.push({
        path: `/${pathNameArr[0]}/${pathNameArr[1]}`,
        component: modulesFiles(path).default,
      });
    }
  });

console.log(routes);

const items: MenuProps["items"] = Object.keys(menus).map((menuName: string) => {
  if (menus[menuName].children) {
    /* return (
      <SubMenu key={menuName} title={menuName}>
        {menus[menuName].children.map(({ name }: any) => {
          return <Menu.Item key={name}>{name}</Menu.Item>;
        })}
      </SubMenu>
    ); */
    return {
      key: menuName,
      label: menuName,
      children: menus[menuName].children.map(({ name }: any) => {
        // return <Menu.Item key={name}>{name}</Menu.Item>;
        return {
          key: name,
          label: name,
        };
      }),
    };
  } else
    return {
      key: menuName,
      label: menuName,
    };
});

function App() {
  const navigate = useNavigate();

  const jumpTo = ({ item, key, keyPath, domEvent }: any) => {
    if (key === "home") {
      navigate("/");
    } else {
      const path = keyPath.reverse().join("/");
      navigate(path);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider>
        <Menu theme="dark" mode="inline" items={items} onClick={jumpTo} />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ minHeight: "100vh" }}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              ></Route>
            ))}
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
