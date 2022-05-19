import React from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, Route } from "react-router-dom";
import routes from "../Routes";
import { getClientStore } from "../store";
import { Provider } from "react-redux";

const store = getClientStore();
console.log(store);
const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Home />
      </div>
    </Provider>
  );
};

hydrateRoot(document.getElementById("root"), <App />);
