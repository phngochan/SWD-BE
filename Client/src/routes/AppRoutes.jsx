// import { Route, Routes } from "react-router-dom";
// import { routes } from ".";
// import Login from "../pages/guest/LoginPage.jsx";
// import Register from "../pages/guest/RegisterPage.jsx";
// import PasswordReset from "../pages/guest/Resetpassword.jsx";
// import Home from "../pages/customer/Home.jsx";
// import Blog from "../pages/guest/Blog.jsx";
// import Services from "../pages/customer/Services.jsx";
// import About from "../pages/customer/About.jsx";
// import Product from "../pages/customer/Product.jsx";
// import SkincareConsultation from "../pages/customer/Skinconsultation.jsx";
// import Calendar from "../pages/customer/Calendar.jsx";
// import ConfirmBooking from "../pages/customer/ComfirmBooking.jsx";
// import StaffManagement from "../pages/manager/StaffManagement.jsx";
// import QuestionManagement from "../pages/manager/QuestionManagement.jsx";
// import TherapistManagement from "../pages/manager/TherapistManagement.jsx";
// import Dashboard from "../pages/manager/Dashboard.jsx";
// import ForgetPassword from "../pages/guest/Forgetpassword.jsx";
// import BookingTherapist from "../pages/customer/BookingTherapist.jsx";
// import AdditionalProducts from "../pages/customer/AdditionalProducts.jsx";
// import CheckOut from "../pages/customer/CheckOut.jsx";
// import ServiceManagement from "../pages/manager/ServiceManagement.jsx";
// import BlogManagement from "../pages/manager/BlogManagement.jsx";
// import ViewBooking from "../pages/staff/ViewBooking.jsx";
// // import ViewBooked from "../pages/consultant/Viewbooked.jsx";


// export default function AppRoute() {
//     return (
//         <Routes>
//             {/* Customer & User */}
//             <Route path={routes.home} element={<Home />} />
//             <Route path={routes.about} element={<About />} />
//             <Route path={routes.login} element={<Login />} />
//             <Route path={routes.register} element={<Register />} />
//             <Route path={routes.forget} element={<ForgetPassword />} />
//             <Route path={routes.resetpassword} element={<PasswordReset />} />
//             <Route path={routes.blog} element={<Blog />} />
//             <Route path={routes.services} element={<Services />} />
//             <Route path={routes.product} element={<Product />} />
//             <Route path={routes.skinconsultation} element={<SkincareConsultation />} />
//             <Route path={routes.bookingtherapist} element={<BookingTherapist />} />
//             <Route path={routes.calendar} element={<Calendar />} />
//             <Route path={routes.confirmbooking} element={<ConfirmBooking />} />
//             <Route path={routes.additionalproducts} element={<AdditionalProducts />} />
//             <Route path={routes.checkout} element={<CheckOut />} />
//             {/* Manager */}
//             <Route path={routes.staffmanagement} element={<StaffManagement />} />
//             <Route path='/question-management' element={<QuestionManagement />} />
//             <Route path='/therapist-management' element={<TherapistManagement />} />
//             <Route path='/dashboard' element={<Dashboard />} />
//             <Route path='/service-management' element={<ServiceManagement />} />
//             <Route path='/blog-management' element={<BlogManagement />} />
//             {/* Staff */}
//             <Route path='/view-booking' element={<ViewBooking />} />
//             {/* Consultant */}
//             {/* <Route path='/view-booked' element={<ViewBooked />} /> */}

//         </Routes>
//     )
// }

import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ProtectedRoute from "../components/ProtectedRoute.jsx";

import LoginPage from "../pages/guest/LoginPage.jsx";
import RegisterPage from "../pages/guest/RegisterPage.jsx";
import SkincareConsultation from "../pages/guest/Skinconsultation.jsx";
import Services from "../pages/guest/Services.jsx";
import MyCalendar from "../pages/customer/Calendar.jsx";
import About from "../pages/guest/About.jsx";
import Blog from "../pages/guest/Blog.jsx";

import ForgotPassword from "../pages/guest/Forgotpassword.jsx";
import VerifyEmailPage from "../pages/guest/VerifyEmailPage.jsx";

// import ProtectedRoute from "./components/ProtectedRoute";

// Import pages

// import Forgotpassword from "./pages/guest/Forgotpassword.jsx";
// import Quiz from "./pages/customer/Quiz.jsx";
// import BlogDetail from "./pages/guest/BlogDetail.jsx";
import ServiceManagement from "../pages/manager/ServiceManagement.jsx";
import StaffManagement from "../pages/manager/StaffManagement.jsx";
import Dashboard from "../pages/manager/Dashboard.jsx";
import TherapistManagement from "../pages/manager/TherapistManagement.jsx";
// import ResetPassword from "./pages/guest/ResetPassword.jsx";
import BlogManagement from "../pages/manager/BlogManagement.jsx";
import QuestionManagement from "../pages/manager/QuestionManagement.jsx";
import ProductManagement from "../pages/manager/ProductManagement.jsx";
// import About from "./pages/guest/About.jsx";
// import BookingPageCustomer from "./pages/customer/Booking.jsx";
// import ConsultantGuest from "./pages/guest/Consultant.jsx";
// import ConsultantCustomer from "./pages/customer/Consultantbooking.jsx";
// import ServiceGuest from "./pages/guest/Services.jsx";
// import Calendar from "./pages/customer/Calendar.jsx";
// import ViewBooking from "./pages/staff/ViewBooking.jsx";
// import ServiceDetails from "./pages/guest/ServiceDetails.jsx";
import ChangePassword from "../components/ChangePassword.jsx";
import BlogDetail from "../pages/guest/BlogDetail.jsx";
// import CustomerProfile from "./pages/customer/CustomerProfile.jsx";
// import SkincareBooking from "./pages/customer/Calendar.jsx";
// import ViewBooked from "./pages/consultant/ViewBooked";
// import ViewBookingHistory from "./pages/customer/BookingHistory.jsx";


axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

function AppRoute() {
  const userRole = localStorage.getItem("roleName"); // Get user role

  // Define default pages for each role
  const roleRoutes = {
    Guest: "/ve-chung-toi",
    Customer: "/ve-chung-toi",
    Manager: "/dashboard",
    Staff: "/view-booking",
  };

  // Default page based on role
  const defaultPage = roleRoutes[userRole] || "/ve-chung-toi";

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        {/* Root path redirects based on role */}
        <Route path="/" element={<Navigate to={defaultPage} replace />} />

        {/* Public Pages */}
        <Route path="/dang-nhap" element={<LoginPage />} />
        <Route path="/dang-ky" element={<RegisterPage />} />
        {/* <Route path="/quen-mat-khau" element={<ForgotPassword />} /> */}
        {/* <Route path="/doi-mat-khau" element={<ResetPassword />} /> */}
        <Route path="/xac-nhan-email" element={<VerifyEmailPage />} />

        {/* Guest & Customer Shared Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Guest", "Customer"]} />}>
          <Route path="/ve-chung-toi" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/services" element={<Services />} />
          {/* <Route path="/services/:id" element={<ServiceDetails />} /> */}
          <Route path="/skincareconsultation" element={<SkincareConsultation />} />
          {/* <Route path="/quiz" element={<Quiz />} /> */}
        </Route>

        {/* Customer Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
          {/* <Route path="/booking" element={<BookingPageCustomer />} /> */}
          <Route path="/lich-hen" element={<MyCalendar />} />
          {/* <Route path="/consultant-customer" element={<ConsultantCustomer />} /> */}
          {/* <Route path="/dich-vu/:id/consultant-customer" element={<ConsultantCustomer />} /> */}
          {/* <Route path="/services/:id/consultant-customer/:idConsultant/calendar" element={<SkincareBooking />} /> */}
          {/* <Route path="/customer-profile" element={<CustomerProfile />} /> */}
          {/* <Route path="/booking-history" element={<ViewBookingHistory />} /> */}
        </Route>

        {/* Manager Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service-management" element={<ServiceManagement />} />
          <Route path="/blog-management" element={<BlogManagement />} />
          <Route path="/question-management" element={<QuestionManagement />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          <Route path="/therapist-management" element={<TherapistManagement />} />
          <Route path="/product-management" element={<ProductManagement />} />
        </Route>



        {/* Company Shared Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Manager", "Staff", "Consultant"]} />}>
          <Route path="/change-password" element={<ChangePassword />} />
        </Route>

        {/* Staff Pages */}
        <Route element={<ProtectedRoute allowedRoles={["Staff"]} />}>
          {/* <Route path="/view-booking" element={<ViewBooking />} /> */}
        </Route>


        <Route element={<ProtectedRoute allowedRoles={["Consultant"]} />}>
          {/* <Route path="/view-booked" element={<ViewBooked />} /> */}
        </Route>


        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to={defaultPage} replace />} />
      </Routes>
    </div>
  );
}

export default AppRoute;