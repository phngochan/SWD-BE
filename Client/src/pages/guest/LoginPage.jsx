// import { useState } from "react";
// import { routes } from "../../routes";
// import { Link } from "react-router-dom";


// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();
//     console.log("Tên đăng nhập:", username);
//     console.log("Mật khẩu:", password);
//     console.log("Đăng nhập thành công!");
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/forgot.png')" }}>
//       <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
//         <h2 className="mb-6 text-3xl font-semibold text-center text-[#2B6A7C]">LOGIN</h2>
//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Username</label>
//             <input
//               type="text"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               placeholder="Enter your username"
//               className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
//             />
//           </div>
//           <div className="flex items-center justify-between mb-4">
//             <div className="flex items-center">
//               <input type="checkbox" id="remember" className="mr-2" />
//               <label htmlFor="remember" className="text-sm text-[#2B6A7C]">Remember me</label>
//             </div>
//             <Link to="/quen-mat-khau" className="text-sm text-[#2B6A7C] hover:underline">Forgot Password?</Link>
//           </div>
//           <button
//             type="submit"
//             className="w-full px-4 py-2 font-bold text-[#2B6A7C] bg-[#ffffff] rounded-lg hover:bg-[#8bc3d3]"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-[#2B6A7C]">
//           Don't have an account? <Link to="/dang-ky" className="text-[#113d49] hover:underline">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { EyeIcon } from "lucide-react";
import { EyeOffIcon } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in and redirect
  useEffect(() => {
    const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const roleName = localStorage.getItem("roleName") || sessionStorage.getItem("roleName");

    if (token) {
      let redirectUrl = "/";
      if (roleName === "Manager") redirectUrl = "/dashboard";
      else if (roleName === "Staff") redirectUrl = "/view-booking";
      else if (roleName === "Consultant") redirectUrl = "/view-booked";
      else if (roleName === "Customer") redirectUrl = "/ve-chung-toi";

      if (window.location.pathname !== redirectUrl) {
        navigate(redirectUrl); // ✅ Chỉ redirect nếu chưa ở đúng trang
      }
    }
  }, []); // ✅ Không đặt navigate vào dependency array


  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, message, user } = response.data;
      const { roleName } = user;
      const { firstName } = user;
      const { lastName } = user;
      const { id } = user;
      const fullName = `${firstName} ${lastName}`;

      setSuccess(message || "Login successful!");

      // Store token based on Remember Me option
      if (rememberMe) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("roleName", roleName);
        localStorage.setItem("rememberedEmail", email);
        localStorage.setItem("fullName", fullName);
        localStorage.setItem("userId", id);
      } else {
        sessionStorage.setItem("authToken", token);
        sessionStorage.setItem("roleName", roleName);
        sessionStorage.setItem("fullName", fullName);
        sessionStorage.setItem("userId", id);
        localStorage.removeItem("rememberedEmail");
      }

      // Redirect based on user roleName
      let redirectUrl = "/";
      if (roleName === "Manager") redirectUrl = "/dashboard";
      else if (roleName === "Staff") redirectUrl = "/view-booking";
      else if (roleName === "Consultant") redirectUrl = "/view-booked";
      else if (roleName === "Customer") redirectUrl = "/about";

      navigate(redirectUrl);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container w-full h-screen bg-[#f9faef] relative mx-auto">
      <Navbar />
      <div className="flex items-center justify-center h-[calc(100%-121px)] relative">
        <div className="absolute h-screen inset-0 bg-[url(/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50 z-0" />
        <div className="relative z-10 w-full max-w-[400px] bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-[#3b9fbb] uppercase mb-6 md:mb-8">
            Đăng nhập
          </h2>
          {error && <div className="text-center text-red-500 mb-4">{error}</div>}
          {success && <div className="text-center text-green-500 mb-4">{success}</div>}

          <form className="flex flex-col gap-4 md:gap-6" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              autoComplete="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[50px] px-4 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8bc3d3]"
            />
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-[50px] px-4 pr-10 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8bc3d3]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
              >
                {showPassword ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center text-gray-700">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                Ghi nhớ tài khoản
              </label>
              <a href="/forgot-password" className="text-[#2B6A7C] font-medium hover:underline">
                Quên mật khẩu?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] text-[#fff] font-bold rounded-lg shadow transition duration-300
                ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#3b9fbb] hover:bg-[#8bc3d3]'}`}
            >
              {loading ? "Đang nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="text-center mt-8 text-gray-700">
            <span>Bạn chưa có tài khoản?</span>{" "}
            <a href="/dang-ky" className="font-bold text-[#2B6A7C] hover:underline">Đăng ký</a>          </div>
        </div>
      </div>
    </div>
  );
}