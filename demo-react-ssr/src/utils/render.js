import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

export const render = (store, routes, req) => {
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path}>
        <div>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              ></Route>
            ))}
          </Routes>
        </div>
      </StaticRouter>
    </Provider>
  );

  return `
			<html>
				<head>
					<title>ssr</title>
				</head>
				<body>
					<div id="root">${content}</div>
					<script>
						window.context = {
							state: ${JSON.stringify(store.getState())}
						}
					</script>
					<script src="bundle.js"></script>
				</body>
			</html>
	  `;
};
