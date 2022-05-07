import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Drawer, Layout, Menu, MenuProps } from "antd";
import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useState } from "react";
import MainAppHome from "./pages/home";
import ReactChild from "./pages/react-child";
import microApps from "./data/microApps";

const { Sider } = Layout;
type MenuItem = Required<MenuProps>["items"][number];

function App() {
  const [drawerVisible, setDrawerVisible] = useState(true);
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

  const getItem = (
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem => {
    return {
      key,
      icon,
      children,
      label,
      onClick: jumpTo,
    } as MenuItem;
  };

  const items: MenuItem[] = [
    getItem("RxJS", "rxjs"),
    getItem("H5 pages", "pages"),
  ];

  const backToMainAppHome = () => {
    navigate("/");
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
          <Menu theme="light" mode="inline" items={items} />
        </Sider>
      </Drawer>
      <Layout className="wh100">
        <Routes>
          <Route path="/" element={<MainAppHome />}></Route>
          {microApps.map(({ path, name, baseroute, url }) => (
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
