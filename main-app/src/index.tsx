import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter as Router } from "react-router-dom";
import microApp from "@micro-zoe/micro-app";

fetch("/frontend-demos/microApp.json")
  .then((resp) => resp.json())
  .then((data: any) => {
    debugger;
    const { apps, menus } = data;
    window.__micro_apps__ = apps.map(({ path, name, baseroute, url }: any) => {
      return {
        path: path,
        name: name,
        baseroute: baseroute,
        url: process.env.NODE_ENV === "development" ? url.dev : url.prod,
      };
    });
    window.__micro_menus__ = menus;
    window.__current_app__ = "main";

    microApp.start();

    const root = ReactDOM.createRoot(
      document.getElementById("root") as HTMLElement
    );
    root.render(
      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
