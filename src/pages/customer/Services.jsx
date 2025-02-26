import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

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
            <Navbar />

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
                                <Link to={'/chon-chuyen-vien'}>
                                    <button className="mt-4 px-6 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">
                                        Đặt Lịch Hẹn
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}