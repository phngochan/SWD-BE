import { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from '../utils/axiosInstance';

const Navbar = ({cart}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
    const [cartIsOpen, setCartIsOpen] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("authToken") || sessionStorage.getItem("authToken"));
    const fullName = localStorage.getItem("fullName") || sessionStorage.getItem("fullName");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("authToken")) || sessionStorage.getItem("authToken");
        };
        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [showModal]);


    // const isLoginPage = location.pathname === "/dang-nhap" || location.pathname === "/dang-ky" || location.pathname === "/customer-profile" || location.pathname === "/forgot-password";
    const isLoginPage = ["/dang-nhap", "/dang-ky", "/customer-profile", "/forgot-password"].includes(location.pathname);

    const handleLogout = () => {
        if (!showModal) return;
        axios.post("/api/auth/logout")
            .then(() => {
                localStorage.removeItem("authToken");
                localStorage.removeItem("roleName");
                localStorage.removeItem("fullName");
                localStorage.removeItem("userId");
                sessionStorage.removeItem("authToken");
                sessionStorage.removeItem("roleName");
                sessionStorage.removeItem("fullName");
                sessionStorage.removeItem("userId");
                navigate("/dang-nhap");
            })
            .catch(error => {
                console.error("Logout failed:", error.response?.data?.message || error.message);
            });
    };

    return (
        <div className="w-full h-[80px] bg-[#E5F5F1] flex items-center justify-between px-6 md:px-12 lg:px-10 shadow-md relative z-10">
            <NavLink to="/" className="w-[150px] h-[50px]">
                <div className="w-full h-full bg-[url(/images/logo.png)] bg-cover bg-no-repeat"></div>
            </NavLink>

            <button
                className="md:hidden text-[#2B6A7C] text-[30px] z-20"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                ☰
            </button>

            <nav
                className={`absolute top-[80px] left-0 w-full bg-[#E5F5F1] flex flex-col items-center pacifico-regular gap-4 p-6 shadow-lg rounded-md transition-transform duration-300 md:static md:w-auto md:p-0 md:flex-row md:shadow-none md:gap-20 ${isMobileMenuOpen ? "flex" : "hidden md:flex"}`}
            >
                {["About", "Services", "Products", "SkincareConsultation", "Blog", "Quiz"].map((item) => (
                    <NavLink
                        key={item}
                        to={`/${item.toLowerCase()}`}
                        className={({ isActive }) =>
                            `text-center text-[20px] font-semibold transition-colors ${isActive ? "text-[#A7DFEC]" : "text-[#2B6A7C] hover:text-[#A7DFEC]"}`
                        }
                    >
                        {item}
                    </NavLink>
                ))}
            </nav>

            {!isLoginPage && (
                <div className="relative flex items-center gap-6">
                    {token && (
                        <button onClick={() => setCartIsOpen(!cartIsOpen)} className="relative">
                            <i className="fa-solid fa-cart-shopping text-[#2B6A7C] text-[30px]"></i>
                            {cart?.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cart.length}
                                </span>
                            )}
                        </button>
                    )}

{cartIsOpen && cart?.length > 0 && (
                        <div className="absolute right-0 top-8 mt-o w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[300px] overflow-y-auto">
                            <h3 className="px-4 py-2 text-lg font-semibold border-b">Giỏ hàng</h3>
                            <ul className="max-h-60 overflow-auto">
                                {cart.map((item, index) => (
                                    <li key={index} className="flex justify-between items-center px-4 py-2">
                                        <span>{item.productName}</span>
                                        <span>{item.price.toLocaleString()} VND</span>
                                    </li>
                                ))}
                            </ul>
                            <NavLink to="/cart" className="block px-4 py-2 text-center text-[#2B6A7C] hover:bg-gray-100">
                                Xem giỏ hàng
                            </NavLink>
                        </div>
                    )}

                    {token ? (
                        <button onClick={() => setIsProfilePopupOpen(!isProfilePopupOpen)}>
                            <i className="fas fa-user text-[#2B6A7C] text-[30px]"></i>
                        </button>
                    ) : (
                        <NavLink to="/dang-nhap" className="hidden md:block bg-[#A7DFEC] text-white text-[18px] px-4 py-2 rounded-full shadow-sm hover:opacity-80">
                            Đăng nhập
                        </NavLink>
                    )}

                    {isProfilePopupOpen && token && (
                        <div className="absolute right-0 top-8 mt-o w-52 bg-white border border-gray-200 rounded-lg shadow-lg z-20 ">
                            <div className="block px-4 py-2 text-gray-800">
                                Chào mừng, {fullName}
                            </div>
                            <NavLink to="/thong-tin-ca-nhan" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Thông tin cá nhân
                            </NavLink>
                            <button onClick={() => setShowModal(true)} className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                                Đăng xuất
                            </button>
                        </div>
                    )}
                </div>
            )}
            {/* Custom Logout Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Log out Confirmation</h3>
                        <p className="text-gray-600">Are you sure you want to log out?</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                onClick={() => setShowModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
                                onClick={handleLogout}
                            >
                                Đăng xuất
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;