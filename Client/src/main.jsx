import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoutes.jsx";
import './index.css'

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  </React.StrictMode>
);
