import { useState } from "react";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      console.log("New Password submitted:", newPassword);
      // You can add your password reset logic here
    } else {
      console.log("Passwords do not match");
      alert("Passwords do not match. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/forgot.png')" }}
    >
      <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
      <h2 className="mb-6 text-3xl font-semibold text-center text-[#2B6A7C]">Reset Password</h2>
        <h3 className="mb-6 text-center text-[#2B6A7C]">Please enter your new password and confirm it.</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-[#2B6A7C] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-[#2B6A7C] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-[#2B6A7C] bg-[#ffffff] rounded-3xl hover:bg-[#8bc3d3]"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#2B6A7C]">
          Remembered your password?{" "}
          <Link to="/dang-nhap" className="text-[#113d49] hover:underline">
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
}