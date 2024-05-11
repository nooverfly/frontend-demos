import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Layout, Menu, MenuProps } from "antd";
import { useEffect } from "react";
import JSEncrypt from "jsencrypt";
import CryptoJS from "crypto-js";

var encryptor = new JSEncrypt(); // 创建加密对象实例
//之前ssl生成的公钥，复制的时候要小心不要有空格
const data = "Xl963852";
const md5 = CryptoJS.MD5(data).toString();
console.log("md5", md5);
var pubKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDSHvhN6DKRyFkfnGDL1HsRmaoxTabNpa0fgk1P6sQQIxrwTg7YmL3gm8XOqHgAIaEk56hFvAi0YZtp1gY5rVZG/dWv24piGIUIoPHUGgjggYVKJ6cZT81S/Xd430k+OSkkrzqWgoG99PSHhhapJ13BdJCes+H9eCqURN2vCnT/9wIDAQAB
-----END PUBLIC KEY-----`;
encryptor.setPublicKey(pubKey); //设置公钥
// @ts-ignore
var rsaPassWord = encryptor.encrypt(md5).toString(); // 对内容进行加密
console.log(rsaPassWord);

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

let items: MenuProps["items"] = [];

if (window.__MICRO_APP_ENVIRONMENT__) {
  window.microApp.dispatch(menus);
} else {
  items = Object.keys(menus).map((menuName: string) => {
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
}

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

  useEffect(() => {
    if (window.__MICRO_APP_ENVIRONMENT__) {
      const listener = (data: any) => {
        navigate(data.path);
      };
      window.microApp.addDataListener(listener);

      return () => {
        window.microApp.removeDataListener(listener);
      };
    }
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {window.__MICRO_APP_ENVIRONMENT__ ? null : (
        <Sider>
          <Menu theme="dark" mode="inline" items={items} onClick={jumpTo} />
        </Sider>
      )}
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
