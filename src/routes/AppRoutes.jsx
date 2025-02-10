import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import ForgetPassword from "../pages/Forgetpassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordReset from "../pages/Resetpassword";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Services from "../pages/Services";

export default function AppRoute() {
    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.forgot} element={<ForgetPassword />} />
            <Route path={routes.resetpassword} element={<PasswordReset />} />
            <Route path={routes.blog} element={<Blog />} />
            <Route path={routes.services} element={<Services />} />
        </Routes>
    )
}