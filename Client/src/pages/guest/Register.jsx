import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });


  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // const [success, setSuccess] = useState("");
  // const [loading, setLoading] = useState(false);

  // Validation rules
  const validate = (name, value) => {
    let errorMessage = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!/^[a-zA-Z\s]{2,}$/.test(value)) {
          errorMessage = "Must contain only letters and be at least 2 characters.";
        }
        break;
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errorMessage = "Invalid email format.";
        }
        break;
      case "password":
        if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(value)) {
          errorMessage = "Must be at least 6 characters, contain an uppercase letter, a number, and a special character.";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10,15}$/.test(value)) {
          errorMessage = "Must contain only digits and be between 10-15 characters.";
        }
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error message for the specific field when user starts typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  // Check if the form data is valid
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.password.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      !errors.email && // Ensure there are no active errors
      !errors.phoneNumber &&
      !errors.form
    );
  };

  // Handle form submission
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
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          phoneNumber: "",
          roleName: "Customer",
        });
        setErrors({});
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message;

        setErrors((prev) => ({
          ...prev,
          email: errorMessage === "Email already in use" ? "This email is already registered." : prev.email,
          phoneNumber: errorMessage === "Phone number already in use" ? "This phone number is already registered." : prev.phoneNumber,
          form: errorMessage !== "Email already in use" && errorMessage !== "Phone number already in use" ? errorMessage : prev.form,
        }));
      } else {
        setErrors((prev) => ({ ...prev, form: "An unexpected error occurred. Please try again." }));
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/forgot.png')" }}>
      <div className="relative w-full max-w-md p-8 bg-[#A7DFEC] bg-opacity-90 rounded-lg shadow-2xl">
        <h2 className="mb-2 text-3xl font-semibold text-center text-[#2B6A7C]">REGISTER</h2>
        {/* {error && <p className="text-center text-red-500 mb-4">{error}</p>}
        {success && <p className="text-center text-green-500 mb-4">{success}</p>} */}
        {/* <form onSubmit={handleSubmit}>
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
        </form> */}
        <form className="flex flex-col gap-2 md:gap-3" onSubmit={handleSubmit}>
          {[{ label: "First Name", name: "firstName", type: "text", placeholder: "Enter first name" },
          { label: "Last Name", name: "lastName", type: "text", placeholder: "Enter last name" },
          { label: "Email", name: "email", type: "email", placeholder: "Enter email" },
          { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
          { label: "Phone Number", name: "phoneNumber", type: "text", placeholder: "Enter phone number" },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name} className="mb-1">
              <label className="block mb-2 text-sm font-medium text-[#2B6A7C]">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border border-[#2B6A7C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B6A7C]`}
                required
              />
              {errors[name] && <div className="text-red-500 text-sm mt-1">{errors[name]}</div>}
            </div>
          ))}

          {/* Register Button */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full mt-5 px-4 py-2 font-bold text-[#2B6A7C] bg-white rounded-lg hover:bg-[#8bc3d3] ${!isFormValid() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-[#2B6A7C]">
          Already have an account? <Link to="/dang-nhap" className="text-[#113d49] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}