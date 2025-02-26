import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import ForgetPassword from "../pages/customer/Forgetpassword.jsx";
import Login from "../pages/customer/Login.jsx";
import Register from "../pages/customer/Register.jsx";
import PasswordReset from "../pages/customer/Resetpassword.jsx";
import Home from "../pages/customer/Home.jsx";
import Blog from "../pages/customer/Blog.jsx";
import Services from "../pages/customer/Services.jsx";
import About from "../pages/customer/About.jsx";
import Product from "../pages/customer/Product.jsx";
import SkincareConsultation from "../pages/customer/Skinconsultation.jsx";
import Calendar from "../pages/customer/Calendar.jsx";
import ConfirmBooking from "../pages/customer/ComfirmBooking.jsx";
import StaffManagement from "../pages/admin/StaffManagement.jsx";
import QuestionManagement from "../pages/manager/QuestionManagement.jsx";
import TherapistManagement from "../pages/admin/TherapistManagement.jsx";
import Dashboard from "../pages/manager/Dashboard.jsx";

export default function AppRoute() {
    return (
        <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.forgot} element={<ForgetPassword />} />
            <Route path={routes.resetpassword} element={<PasswordReset />} />
            <Route path={routes.blog} element={<Blog />} />
            <Route path={routes.services} element={<Services />} />
            <Route path={routes.product} element={<Product />} />
            <Route path={routes.skinconsultation} element={<SkincareConsultation />} />
            <Route path={routes.calendar} element={<Calendar />} />
            <Route path={routes.confirmbooking} element={<ConfirmBooking />} />
            <Route path={routes.staffmanagement} element={<StaffManagement />} />
            <Route path='/question-management' element={<QuestionManagement />} />
            <Route path='/therapist-management' element={<TherapistManagement />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}