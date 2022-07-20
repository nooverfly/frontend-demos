import express from "express";
import browserify from "browserify";
import babelify from "babelify";
import { render } from "./utils/render";
import { matchRoutes } from "react-router-config";
import { getStore } from "./store";
import routes from "./Routes";

const app = express();
const port = 3000;
const { resolve } = require("path");

app.use(express.static("public"));

app.get("/bundle.js", (req, res) => {
  browserify(resolve(__dirname, "./client/index.js"), { debug: true })
    .transform(babelify)
    .bundle()
    .pipe(res);
});

// app.get("/", (req, res) => {
//   res.end(`
//         <html>
//             <head>
//                 <title>ssr</title>
//             </head>
//             <body>
//                 <div id="root">${content}</div>
//                 <script src="bundle.js"></script>
//             </body>
//         </html>
//   `);
// });

app.get("*", function (req, res) {
  const store = getStore();
  // 根据路由的路径，来往store里面加数据
  // const matchedRoutes = matchRoutes(routes, req.path);
  // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
  const promises = [];
  const matchedRoutes = routes.filter((route) => req.path === route.path);
  console.log(matchedRoutes, req.path);
  matchedRoutes.forEach((item) => {
    if (item.component.loadData) {
      console.log("loadData");
      promises.push(item.component.loadData(store));
    }
  });
  Promise.all(promises).then(() => {
    res.send(render(store, routes, req));
  });
  // res.send(render(store, routes, req));
});

app.listen(port, () => {
  console.log("ready");
});
