import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(
  <Router basename={window.__MICRO_APP_BASE_ROUTE__ || ""}>
    <App />
  </Router>
);
