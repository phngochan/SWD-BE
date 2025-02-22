import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Blog() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            {/* Header */}
            <Navbar />

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
            <Footer />
        </div>
    );
}
