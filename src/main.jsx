// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import Login from './Login.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Login />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppRoute from './routes/AppRoutes.jsx';

ReactDOM.render(
  <BrowserRouter>
    <AppRoute />
  </BrowserRouter>,
  document.getElementById("root")
);
