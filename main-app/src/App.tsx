import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Drawer, Layout, Menu } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ChildApp from "./components/child-app";
import microApp from "@micro-zoe/micro-app";

const { Sider } = Layout;

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  title: React.ReactNode,
  // icon?: React.ReactNode,
  children?: any[]
) => {
  return {
    key,
    // icon,
    children,
    label,
    title,
  };
};

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

const items = Object.keys(menus).map((menuName: string) => {
  if (menus[menuName].children) {
    return {
      key: menuName,
      label: menuName,
      children: menus[menuName].children.map(({ name }: any) => {
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const navigate = useNavigate();

  const openDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const DrawerController = drawerVisible
    ? DoubleRightOutlined
    : DoubleLeftOutlined;

  const jumpTo = ({ item, key, keyPath, domEvent }: any) => {
    const path = keyPath.reverse().join("/");
    navigate(`/${path}`);
    setDrawerVisible(false);
    const { title } = item?.props;
    window.__current_app__ = title;
  };

  const backToMainAppHome = () => {
    navigate("/");
    window.__current_app__ = "main";
    setDrawerVisible(false);
  };

  const [menus, setMenus] = useState<any[]>([]);
  const [childMenu, setChildMenu] = useState<any[]>([]);
  useEffect(() => {
    const items: any[] = window.__micro_menus__.map((menu: any) => {
      if (menu.children) {
        return getItem(
          menu.label,
          menu.key,
          menu.label,
          menu.children.map((m: any) => getItem(m.label, m.key, m.label))
        );
      } else {
        return getItem(menu.label, menu.key, menu.label);
      }
    });
    setMenus(items);
  }, []);

  const getSubChildMenu = (data: any) => {
    const subChildData = Object.keys(data).map((menuName: string) => {
      if (data[menuName].children) {
        return {
          key: menuName,
          label: menuName,
          children: data[menuName].children.map(({ name }: any) => {
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
    setChildMenu(subChildData);
  };

  const childAppJumpTo = ({ item, key, keyPath, domEvent }: any) => {
    const app = window.__current_app__;
    if (app === "main") {
      if (key === "home") {
        navigate("/");
      } else {
        const path = keyPath.reverse().join("/");
        navigate(path);
      }
    } else {
      if (key === "home") {
        microApp.setData(window.__current_app__, { path: "/" });
      } else {
        const path = keyPath.reverse().join("/");
        microApp.setData(window.__current_app__, { path });
      }
    }
  };

  return (
    <div className="wh100">
      <DrawerController
        onClick={openDrawer}
        className={`main-app-drawer-btn ${
          drawerVisible ? "main-app-drawer-open" : ""
        }`}
      />
      <Drawer
        placement="right"
        closable={false}
        visible={drawerVisible}
        mask={false}
        maskClosable={false}
        bodyStyle={{ padding: 0 }}
      >
        <Sider width={378} className="h100" theme="light">
          <div
            style={{
              width: 50,
              height: 20,
              backgroundColor: "#FF0",
            }}
            onClick={backToMainAppHome}
          ></div>
          <Menu theme="light" mode="inline" items={menus} onClick={jumpTo} />
        </Sider>
      </Drawer>
      <Layout className="wh100">
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            items={window.__current_app__ === "main" ? items : childMenu}
            onClick={childAppJumpTo}
          />
        </Sider>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            ></Route>
          ))}
          {window.__micro_apps__.map(({ path, name, baseroute, url }) => (
            <Route
              path={path}
              key={path}
              element={
                <ChildApp
                  name={name}
                  baseroute={baseroute}
                  url={url}
                  childData={getSubChildMenu}
                />
              }
            ></Route>
          ))}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
