import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Home from "../pages/home";

export const render = (store, routes, req) => {
  const content = renderToString(
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );

  return `
			<html>
				<head>
					<title>ssr</title>
				</head>
				<body>
					<div id="root">${content}</div>
					<script src="bundle.js"></script>
				</body>
			</html>
	  `;
};
