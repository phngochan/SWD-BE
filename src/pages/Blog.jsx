import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Blog() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            {/* Header */}
            <header className="bg-[#E5F5F1] shadow-md py-6 px-8 flex justify-between items-center">
                <h1 className="text-[#A7DFEC] text-2xl font-bold">SWD</h1>
                <nav className="flex space-x-20">
                    <Link to="/ve-chung-toi" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">About</Link>
                    <Link to="/dich-vu" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Service</Link>
                    <Link to="#" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Skincare Consultation</Link>
                    <Link to="/san-pham" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Product</Link>
                    <Link to="/blog" className="text-gray-700 font-semibold hover:text-[#2B6A7C]">Blog</Link>
                </nav>
                <Link to="/dang-nhap">
                    <button className="bg-[#A7DFEC] text-white px-4 py-2 rounded-full hover:bg-[#2B6A7C]">Login</button>
                </Link>
            </header>

            {/* Blog Hero Section */}
            <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
                style={{
                    backgroundImage: "url('/images/blogbg.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed"
                }}>
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Skincare Blog</h1>
            </div>

            {/* Blog Content */}
            <div className="max-w-5xl mx-auto px-6 py-16 text-gray-800">
                <h2 className="text-[#2B6A7C] text-3xl font-bold text-center mb-6">Cẩm Nang Chăm Sóc Da Mặt</h2>
                <p className="text-[#2B6A7C] text-lg text-center leading-relaxed">
                    Cập nhật những bí quyết, kinh nghiệm và kiến thức giúp bạn có làn da khỏe đẹp mỗi ngày.
                </p>

                {/* Blog Posts */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="/images/skincare1.png" alt="Chăm sóc da cơ bản" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-[#2B6A7C] text-xl font-semibold">Chăm Sóc Da Mặt Đúng Cách</h3>
                            <p className="text-[#2B6A7C] mt-2">Những bước chăm sóc da cơ bản giúp bạn có làn da tươi trẻ mỗi ngày.</p>
                            <Link to="/blog/cham-soc-da" className="text-[#2B6A7C] font-semibold mt-4 inline-block">Đọc thêm →</Link>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="/images/skincare2.png" alt="Dưỡng ẩm đúng cách" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-[#2B6A7C] text-xl font-semibold">Tầm Quan Trọng Của Dưỡng Ẩm</h3>
                            <p className="text-[#2B6A7C] mt-2">Dưỡng ẩm đúng cách giúp da khỏe mạnh và ngăn ngừa lão hóa.</p>
                            <Link to="/blog/duong-am" className="text-[#2B6A7C] font-semibold mt-4 inline-block">Đọc thêm →</Link>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <img src="/images/skincare3.png" alt="Chống nắng cho da" className="w-full h-48 object-cover" />
                        <div className="p-4">
                            <h3 className="text-[#2B6A7C] text-xl font-semibold">Bí Quyết Chống Nắng</h3>
                            <p className="text-[#2B6A7C] mt-2">Cách bảo vệ làn da khỏi tác hại của ánh nắng mặt trời.</p>
                            <Link to="/blog/chong-nang" className="text-[#2B6A7C] font-semibold mt-4 inline-block">Đọc thêm →</Link>
                        </div>
                    </div>

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
