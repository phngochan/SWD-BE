import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const services = [
    { name: "pro calm skin treatment", image: "/images/skincare1.png" },
    { name: "luxliftfacial", image: "/images/skincare2.png" },
    { name: "pro bright skin treatment", image: "/images/skincare3.png" },
    { name: "pro nanoinfusion", image: "/images/skincare1.png" },
    { name: "pro clear skin treatment", image: "/images/skincare2.png" },
    { name: "pro firm neck + skin treatment", image: "/images/skincare3.png" },
];

export default function Services() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            {/* Header */}
            <header className="bg-[#E5F5F1] shadow-md py-6 px-8 flex justify-between items-center">
                <h1 className="text-[#A7DFEC] text-2xl font-bold">SWD</h1>
                <nav className="flex space-x-20">
                    <Link to="/ve-chung-toi" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">About</Link>
                    <Link to="/dich-vu" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Service</Link>
                    <Link to ="#" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Skincare Consultation</Link>
                    <Link to ="/san-pham" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Product</Link>
                    <Link to="/blog" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Blog</Link>
                </nav>
                <Link to="/dang-nhap">
                    <button className="bg-[#A7DFEC] text-white px-4 py-2 rounded-full hover:bg-[#2B6A7C]">Login</button>
                </Link>
            </header>

            {/* Services Hero Section */}
            <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: "url('/images/service.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Skincare Services</h1>
            </div>

            {/* Services Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                <h2 className="text-[#2B6A7C] text-3xl font-bold text-center mb-6">Dịch Vụ Chăm Sóc Da Chuyên Nghiệp</h2>
                <p className="text-[#2B6A7C] text-lg text-center leading-relaxed pb-8">
                    Chúng tôi cung cấp các liệu trình chăm sóc da chuyên sâu giúp bạn có làn da khỏe mạnh, tươi sáng.
                </p>

                {/* Services List */}
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00000000]">
                                <img src={service.image} alt={service.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold">{service.name}</h3>
                                <button className="mt-3 px-7 py-1 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
                                    Chọn
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#E5F5F1] text-[#2B6A7C] py-10">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-6">
                    <div>
                        <h3 className="text-lg font-bold">Let's Stay Social</h3>
                        <div className="flex space-x-4 mt-2">
                            <a href="#" className="hover:text-[#000000]"><FaFacebook size={24} /></a>
                            <a href="#" className="hover:text-[#000000]"><FaInstagram size={24} /></a>
                            <a href="#" className="hover:text-[#000000]"><FaTwitter size={24} /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-[#2B6A7C] text-lg font-bold">About</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Our Story</a></li>
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Mission</a></li>
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Sustainability</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#2B6A7C] text-lg font-bold">Support</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Contact Us</a></li>
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">FAQ</a></li>
                            <li><a href="#" className="text-[#2B6A7C] hover:text-[#000000]">Shipping & Returns</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[#2B6A7C] text-lg font-bold">Legal</h3>
                        <ul className="mt-2 space-y-1">
                            <li><a href="#" className="text-[#2B6A7C] hover:text-white">Privacy Policy</a></li>
                            <li><a href="#" className="text-[#2B6A7C] hover:text-white">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
                <div className="text-center mt-8 text-[#2B6A7C] text-sm">
                    &copy; 2025 SWD. All rights reserved.
                </div>
            </footer>
        </div>
    );
}