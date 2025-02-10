import { useState } from "react";
import { routes } from "../routes";
import { Link } from "react-router-dom";


export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    // You can add your reset password logic here
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/forgot.png')" }}
    >
      <div className="relative w-full max-w-md p-8 bg-[#E8BFB6] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-[#3A2A2A]">Forget Password ?</h2>
        <h3 className="mb-6 text-center">Don’t worry! It happens. Please enter the email associated with your account.</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#3A2A2A]">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-[#D8A7A0] rounded-3xl focus:outline-none focus:ring-2 focus:ring-[#AF8076]"
            />
          </div>
          <Link to="/da-doi-mat-khau">
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white bg-[#AF8076] rounded-3xl hover:bg-[#8F6A5B]"
            >
              Submit
            </button>
          </Link>

        </form>
        <p className="mt-4 text-center text-sm text-[#3A2A2A]">
          Remembered your password?{" "}
          <Link to="/dang-nhap">
            Go back to login
          </Link>
          {/* <a href="/login" className="text-[#AF8076] hover:underline">
            Go back to Login
          </a> */}
        </p>
      </div>
    </div>
  );
}
