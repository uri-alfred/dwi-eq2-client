import React from "react";
import ReactDOM from "react-dom/client";
const dotenv = require('dotenv');
dotenv.config({ path: ".env" });
import "./index.css";
import App from "./App";
import { ProSidebarProvider } from "react-pro-sidebar";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProSidebarProvider>
      <App />
    </ProSidebarProvider>
  </React.StrictMode>
);
