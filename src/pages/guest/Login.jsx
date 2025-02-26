import { useState } from "react";
import { routes } from "../../routes";
import { Link } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Tên đăng nhập:", username);
    console.log("Mật khẩu:", password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/images/forgot.png')" }}>
      <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-[#2B6A7C]">LOGIN</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm text-[#2B6A7C]">Remember me</label>
            </div>
            <Link to="/quen-mat-khau" className="text-sm text-[#2B6A7C] hover:underline">Forgot Password?</Link>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-[#2B6A7C] bg-[#ffffff] rounded-lg hover:bg-[#8bc3d3]"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#2B6A7C]">
          Don't have an account? <Link to="/dang-ky" className="text-[#113d49] hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
