import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Họ và Tên:", fullName);
    console.log("Số điện thoại:", phoneNumber);
    console.log("Email:", email);
    console.log("Tên đăng nhập:", username);
    console.log("Mật khẩu:", password);
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/forgot.png')" }}
    >
      <div className="relative w-full max-w-md p-8 bg-[#E8BFB6] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-bold text-center text-[#3A2A2A]">REGISTER</h2>
        <form onSubmit={handleSubmit}>
          {/* Form đăng ký */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Full Name</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Phone Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-md focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-[#3A2A2A]">Remember me</label>
            </div>
            <Link to="/quen-mat-khau" className="text-sm text-[#AF8076] hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-[#AF8076] rounded-lg hover:bg-[#8F6A5B]"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#3A2A2A]">
          Already have an account?{" "}
          <Link to="/dang-nhap" className="text-[#AF8076] hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
