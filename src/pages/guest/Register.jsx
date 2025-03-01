// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function Register() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Họ và Tên:", fullName);
//     console.log("Số điện thoại:", phoneNumber);
//     console.log("Email:", email);
//     console.log("Tên đăng nhập:", username);
//     console.log("Mật khẩu:", password);
//   };

//   return (
//     <div
//       className="flex items-center justify-center min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: "url('/images/forgot.png')" }}
//     >
//       <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
//         <h2 className="mb-6 text-3xl font-semibold text-center text-[#2B6A7C]">REGISTER</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Form đăng ký */}
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Full Name</label>
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               placeholder="Enter your full name"
//               className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Phone Number</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="Enter your phone number"
//               className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]"
//             />
//           </div>
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
//             Register
//           </button>
//         </form>
//         <p className="mt-4 text-center text-sm text-[#2B6A7C]">
//           Already have an account?{" "}
//           <Link to="/dang-nhap" className="text-[#113d49] hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setSuccess("");
  //   setLoading(true);

  //   console.log("Registering with:", {firstName, lastName, phoneNumber, email, password});

  //   try {
  //     const response = await axios.post("/api/auth/register", {
  //       firstName,
  //       lastName,
  //       phoneNumber,
  //       email,
  //       password,
  //     });

  //     setSuccess("Registration successful! Redirecting to login...");
  //     setTimeout(() => navigate("/dang-nhap"), 2000);
  //   } catch (err) {
  //     setError(err.response?.data?.message || "Registration failed. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("handleSubmit đã được gọi!"); // Kiểm tra xem hàm có chạy không
    
    setError("");
    setSuccess("");
    setLoading(true);
  
    // In ra console nhưng không gửi dữ liệu lên server
    console.log("Bạn đã nhập:", { firstName, lastName, phoneNumber, email, password });
  
    // Giả lập xử lý thành công mà không gọi API
    setTimeout(() => {
      console.log("Giả lập: Dữ liệu đã được xử lý!");
      setSuccess("Registration successful! (Simulated)");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/forgot.png')" }}>
      <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-6 text-3xl font-semibold text-center text-[#2B6A7C]">REGISTER</h2>
        {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {success && <p className="text-center text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">First Name</label>
            <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your First name" className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Last Name</label>
            <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your Last name" className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Phone Number</label>
            <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter your phone number" className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]" />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]" />
          </div>
          <button type="submit" disabled={loading} className={`w-full px-4 py-2 font-bold text-[#2B6A7C] bg-white rounded-lg hover:bg-[#8bc3d3] ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#2B6A7C]">
          Already have an account? <Link to="/dang-nhap" className="text-[#113d49] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}