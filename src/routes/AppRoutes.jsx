import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import ForgetPassword from "../pages/Forgetpassword";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PasswordReset from "../pages/Resetpassword";
import Home from "../pages/Home";
import Blog from "../pages/Blog";
import Services from "../pages/Services";
import About from "../pages/About";
import Product from "../pages/Product";
import SkincareConsultation from "../pages/Skinconsultation";
import Calendar from "../pages/Calendar";
import ConfirmBooking from "../pages/ComfirmBooking";
import StaffManagement from "../admin/StaffManagement.jsx";
import QuestionManagement from "../manager/QuestionManagement.jsx";
import TherapistManagement from "../admin/TherapistManagement.jsx";
import Dashboard from "../manager/Dashboard.jsx";

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
            <Route path='/staff-management' element={<StaffManagement />} />
            <Route path='/question-management' element={<QuestionManagement />} />
            <Route path='/therapist-management' element={<TherapistManagement />} />
            <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
    )
}