import { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

export default function Checkout() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
    });

    // Dữ liệu giả định về các mục đã đặt
    const bookedItems = {
        service: "Chăm sóc da chuyên sâu",
        expert: "Dr. Emma Johnson",
        additionalProducts: ["Serum dưỡng ẩm", "Kem chống nắng"],
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted: ", formData);
        // Xử lý dữ liệu form ở đây, ví dụ như gửi đến API
    };

    return (
        <div className="min-h-screen bg-[#F5F5F5]">
            <Navbar />
            <div className="max-w-6xl mx-auto p-4">
                <h1 className="text-4xl font-bold text-[#2B6A7C] text-center mb-8">Checkout</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Phần điền thông tin */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-[#2B6A7C] mb-6">Thông tin khách hàng</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                                    Họ và tên
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                                    Số điện thoại
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Link to="/booking-therapist" className="text-[#2B6A7C] hover:text-[#A7DFEC]">
                                    Quay lại
                                </Link>
                                <button
                                    type="submit"
                                    className="bg-[#A7DFEC] hover:bg-[#2B6A7C] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Phần hiển thị các mục đã đặt */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-[#2B6A7C] mb-6">Chi tiết đơn hàng</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Dịch vụ</h3>
                                <p className="text-gray-600">{bookedItems.service}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Chuyên viên</h3>
                                <p className="text-gray-600">{bookedItems.expert}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">Sản phẩm thêm</h3>
                                <ul className="list-disc list-inside text-gray-600">
                                    {bookedItems.additionalProducts.map((product, index) => (
                                        <li key={index}>{product}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}