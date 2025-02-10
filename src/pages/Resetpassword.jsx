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
      <div className="relative w-full max-w-md p-8 bg-[#E8BFB6] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-[#3A2A2A]">Reset Password</h2>
        <h3 className="mb-6 text-center">Please enter your new password and confirm it.</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-[#AF8076] rounded-3xl hover:bg-[#8F6A5B]"
          >
            Reset Password
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#3A2A2A]">
          Remembered your password?{" "}
          <Link to="/dang-nhap" className="text-[#AF8076] hover:underline">
            Go back to login
          </Link>
        </p>
      </div>
    </div>
  );
}