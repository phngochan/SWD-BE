import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      !errors.email &&
      !errors.phoneNumber &&
      !errors.form
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill in all fields correctly.");
      return;
    }
    try {
      const response = await axios.post("/api/auth/register", {
        ...formData,
        roleName: "Customer",
      });
      if (response.status === 201) {
        alert("Registration successful! Please check your email to verify your account.");
        setFormData({ firstName: "", lastName: "", email: "", password: "", phoneNumber: "" });
        setErrors({});
        navigate("/dang-nhap");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, form: "An unexpected error occurred. Please try again." }));
    }
  };

  return (
    <div className="w-full h-screen bg-[#f9faef] flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center relative">
        <div className="absolute inset-0 bg-[url(/images/login.png)] bg-cover bg-center bg-no-repeat opacity-50" />
        <div className="relative w-full max-w-lg bg-white bg-opacity-90 rounded-xl shadow-lg p-6 md:p-8">
          <h2 className="text-center text-2xl font-bold text-[#3b9fbb] uppercase mt-2 mb-3">Đăng ký  </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {[{ label: "Họ", name: "firstName", type: "text", placeholder: "Nhập họ" },
            { label: "Tên", name: "lastName", type: "text", placeholder: "Nhập tên" },
            { label: "Email", name: "email", type: "email", placeholder: "Nhập địa chỉ gmail" },
            { label: "Mật khẩu", name: "password", type: "password", placeholder: "Nhập mật khẩu" },
            { label: "Số điện thoại", name: "phoneNumber", type: "text", placeholder: "Nhập số điện thoại" },
            ].map(({ label, name, type, placeholder }) => (
              <div key={name}>
                <label className="block text-lg font-semibold text-[#2B6A7C] mb-1">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={`w-full h-[50px] px-4 border ${errors[name] ? "border-red-500" : "border-gray-300"
                    } rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 ${errors[name] ? "focus:ring-red-500" : "focus:ring-[#8bc3d3]"
                    }`}
                  required
                />
                {errors[name] && <div className="text-red-500 text-sm mt-1">{errors[name]}</div>}
              </div>
            ))}
            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[50px] mt-3 bg-[#3b9fbb] text-white font-bold rounded-lg shadow transition duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "hover:bg-[#8bc3d3]"}`}
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </button>
          </form>
          <div className="text-center mt-6 text-gray-700 text-sm">
            <span>Bạn đã có tài khoản? </span>
            <a href="/dang-nhap" className="font-bold text-[#2B6A7C] hover:underline">Đăng nhập</a>
          </div>
        </div>
      </div>
    </div>
  );
}
