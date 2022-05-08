import "./public-path";
import { createApp, App as AppInstance } from "vue";
import {
  createRouter,
  createWebHashHistory,
  Router,
  RouterHistory,
} from "vue-router";
import Antd from "ant-design-vue";
import App from "./App.vue";
import "./App.less";
import "ant-design-vue/dist/antd.css";
import routes from "./router";

// createApp(App).use(router).mount("#app");

/**
 * 用于解决主应用和子应用都是vue-router4时相互冲突，导致点击浏览器返回按钮，路由错误的问题。
 * 相关issue：https://github.com/micro-zoe/micro-app/issues/155
 * 当前vue-router版本：4.0.12
 */
function fixBugForVueRouter4(router: Router) {
  // 判断主应用是main-vue3或main-vite，因为这这两个主应用是 vue-router4
  if (
    window.location.href.includes("/main-vue3") ||
    window.location.href.includes("/main-vite")
  ) {
    /**
     * 重要说明：
     * 1、这里主应用下发的基础路由为：`/main-xxx/app-vue3`，其中 `/main-xxx` 是主应用的基础路由，需要去掉，我们只取`/app-vue3`，不同项目根据实际情况调整
     *
     * 2、realBaseRoute 的值为 `/app-vue3`
     */
    const realBaseRoute = window.__MICRO_APP_BASE_ROUTE__.replace(
      /^\/main-[^/]+/g,
      ""
    );

    router.beforeEach(() => {
      if (typeof window.history.state?.current === "string") {
        window.history.state.current = window.history.state.current.replace(
          new RegExp(realBaseRoute, "g"),
          ""
        );
      }
    });

    router.afterEach(() => {
      if (typeof window.history.state === "object") {
        window.history.state.current =
          realBaseRoute + (window.history.state.current || "");
      }
    });
  }
}

let app: AppInstance | null = null;
let router: Router | null = null;
let history: RouterHistory | null = null;

function mount() {
  /* history = createWebHashHistory(
    // window.__MICRO_APP_BASE_ROUTE__ || process.env.BASE_URL || "/"
    "/antdv/"
  ); */
  history = createWebHashHistory();
  router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  app = createApp(App);
  app.use(router);
  app.use(Antd);
  app.mount("#app");

  // fixBugForVueRouter4(router)
}

function unmount() {
  app?.unmount();
  app = null;
  console.log("卸载微应用antdv");
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
} else {
  mount();
}
