import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "../Routes";
import { getClientStore } from "../store";
import { Provider } from "react-redux";

const store = getClientStore();
const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
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
      </BrowserRouter>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root"), <App />);
