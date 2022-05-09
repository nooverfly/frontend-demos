import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Drawer, Layout, Menu, MenuProps } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import MainAppHome from "./pages/home";
import ReactChild from "./pages/react-child";
// import microApps from "./data/microApps";

const { Sider } = Layout;

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: any[]
) => {
  return {
    key,
    icon,
    children,
    label,
  };
};

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
    navigate(`/${key}/`);
    setDrawerVisible(false);
  };

  const backToMainAppHome = () => {
    navigate("/");
  };

  const [menus, setMenus] = useState<any[]>([]);
  useEffect(() => {
    const items: any[] = window.__micro_menus__.map((menu: any) =>
      getItem(menu.label, menu.key)
    );
    setMenus(items);
  }, []);

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
        <Routes>
          <Route path="/" element={<MainAppHome />}></Route>
          {window.__micro_apps__.map(({ path, name, baseroute, url }) => (
            <Route
              path={path}
              key={path}
              element={
                <ReactChild name={name} baseroute={baseroute} url={url} />
              }
            ></Route>
          ))}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
