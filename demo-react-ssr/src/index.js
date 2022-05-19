import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "./pages/home";
import browserify from "browserify";
import babelify from "babelify";

import { render } from "./utils/render";
import { getStore } from "./store";

const app = express();
const port = 3000;
const content = renderToString(<Home />);
const { resolve } = require("path");

console.log(content);
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
  console.log(store);
  // // 根据路由的路径，来往store里面加数据
  // const matchedRoutes = matchRoutes(routes, req.path);
  // // 让matchRoutes里面所有的组件，对应的loadData方法执行一次
  // const promises = [];
  // matchedRoutes.forEach(item => {
  // 	if (item.route.loadData) {
  // 		promises.push(item.route.loadData(store))
  // 	}
  // })
  // Promise.all(promises).then(() => {
  // 	res.send(render(store, routes, req));
  // })
  res.send(render(store, routes, req));
});

app.listen(port, () => {
  console.log("ready");
});
