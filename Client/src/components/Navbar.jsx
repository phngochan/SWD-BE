import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Kiểm tra xem có token hay không
    const token = localStorage.getItem('token');

    // Check if the current path is "/login" or "/register"
    const isLoginPage = location.pathname === "/login" || location.pathname === "/register";

    // Hàm để lấy đường dẫn với -customer nếu có token
    const getNavLink = (path) => {
        return token ? `${path}-customer` : path;
    };

    return (
        <div className="bg-[#E5F5F1] shadow-md py-6 px-8 flex justify-between items-center">
            {/* Logo */}
            <Link to="/">
                <img src="/images/logo.png" alt="SWD Logo" className="h-10 w-16" />
            </Link>

            {/* Mobile Menu Button */}
            <button
                className="md:hidden text-[#2B6A7C] text-[30px] z-20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                ☰
            </button>

            {/* Navigation Links */}
            <nav className={`flex space-x-20 text-[17px] font-semibold ${isMobileMenuOpen ? 'flex bg-[#F9FAEF] p-4 rounded-lg shadow-lg absolute top-[100px] left-0 right-0' : 'hidden'} md:flex`}>
                <NavLink
                    to={getNavLink("/ve-chung-toi")}
                    className={({ isActive }) =>
                        `text-center ${isActive ? 'text-[#404040]' : 'text-[#2B6A7C]'}`}
                >
                    About
                </NavLink>
                <NavLink
                    to={getNavLink("/dich-vu")}
                    className={({ isActive }) =>
                        `text-center ${isActive ? 'text-[#404040]' : 'text-[#2B6A7C]'}`}
                >
                    Services
                </NavLink>
                <NavLink
                    to={getNavLink("/tu-van-cham-soc-da")}
                    className={({ isActive }) =>
                        `text-center ${isActive ? 'text-[#404040]' : 'text-[#2B6A7C]'}`}
                >
                    Skincare Consultation
                </NavLink>
                <NavLink
                    to={getNavLink("/san-pham")}
                    className={({ isActive }) =>
                        `text-center ${isActive ? 'text-[#404040]' : 'text-[#2B6A7C]'}`}
                >
                    Product
                </NavLink>
                <NavLink
                    to={getNavLink("/blog")}
                    className={({ isActive }) =>
                        `text-center ${isActive ? 'text-[#404040]' : 'text-[#2B6A7C]'}`}
                >
                    Blog
                </NavLink>
            </nav>

            {/* Conditional Login Button */}
            {!isLoginPage && (
                <Link to="/dang-nhap">
                    <button className="bg-[#A7DFEC] text-white px-4 py-2 rounded-full hover:bg-[#2B6A7C]">Login</button>
                </Link>
            )}
        </div>
    );
}