import { Route, Routes } from "react-router-dom";
import { routes } from ".";
import Login from "../pages/guest/Login.jsx";
import Register from "../pages/guest/Register.jsx";
import PasswordReset from "../pages/guest/Resetpassword.jsx";
import Home from "../pages/customer/Home.jsx";
import Blog from "../pages/guest/Blog.jsx";
import Services from "../pages/customer/Services.jsx";
import About from "../pages/customer/About.jsx";
import Product from "../pages/customer/Product.jsx";
import SkincareConsultation from "../pages/customer/Skinconsultation.jsx";
import Calendar from "../pages/customer/Calendar.jsx";
import ConfirmBooking from "../pages/customer/ComfirmBooking.jsx";
import StaffManagement from "../pages/manager/StaffManagement.jsx";
import QuestionManagement from "../pages/manager/QuestionManagement.jsx";
import TherapistManagement from "../pages/manager/TherapistManagement.jsx";
import Dashboard from "../pages/manager/Dashboard.jsx";
import ForgetPassword from "../pages/guest/Forgetpassword.jsx";
import BookingTherapist from "../pages/customer/BookingTherapist.jsx";
import AdditionalProducts from "../pages/customer/AdditionalProducts.jsx";
import CheckOut from "../pages/customer/CheckOut.jsx";
import ServiceManagement from "../pages/manager/ServiceManagement.jsx";
import BlogManagement from "../pages/manager/BlogManagement.jsx";
import ViewBooking from "../pages/staff/ViewBooking.jsx";


export default function AppRoute() {
    return (
        <Routes>
            {/* Customer & User */}
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.forget} element={<ForgetPassword />} />
            <Route path={routes.resetpassword} element={<PasswordReset />} />
            <Route path={routes.blog} element={<Blog />} />
            <Route path={routes.services} element={<Services />} />
            <Route path={routes.product} element={<Product />} />
            <Route path={routes.skinconsultation} element={<SkincareConsultation />} />
            <Route path={routes.bookingtherapist} element={<BookingTherapist />} />
            <Route path={routes.calendar} element={<Calendar />} />
            <Route path={routes.confirmbooking} element={<ConfirmBooking />} />
            <Route path={routes.additionalproducts} element={<AdditionalProducts />} />
            <Route path={routes.checkout} element={<CheckOut />} />
            {/* Manager */}
            <Route path={routes.staffmanagement} element={<StaffManagement />} />
            <Route path='/question-management' element={<QuestionManagement />} />
            <Route path='/therapist-management' element={<TherapistManagement />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/service-management' element={<ServiceManagement />} />
            <Route path='/blog-management' element={<BlogManagement />} />
            <Route path='/view-booking' element={<ViewBooking />} />

        </Routes>
    )
}