import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import './index.css'
import AppRoute from "./routes/AppRoutes";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </React.StrictMode>
);
