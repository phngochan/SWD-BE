import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ServiceCard from "../../components/ServiceCard";

const services = [
    { name: "ありがとうございます。", image: "/images/skincare1.png" },
    { name: "luxliftfacial", image: "/images/skincare2.png" },
    { name: "pro bright skin treatment", image: "/images/skincare3.png" },
    { name: "pro nanoinfusion", image: "/images/skincare1.png" },
    { name: "pro clear skin treatment", image: "/images/skincare2.png" },
    { name: "pro firm neck + skin treatment", image: "/images/skincare3.png" },
    { name: "pro lê bê + skin treatment", image: "/images/skincare3.png" },
    { name: "pro arigato + skin treatment", image: "/images/skincare3.png" },
    { name: "おはようございます。 + skin treatment", image: "/images/skincare3.png" },
];

export default function Services() {
    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navbar />
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
            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                <h2 className="text-[#2B6A7C] text-3xl font-bold text-center mb-6">Dịch Vụ Chăm Sóc Da Chuyên Nghiệp</h2>
                <p className="text-[#2B6A7C] text-lg text-center leading-relaxed pb-8">
                    Chúng tôi cung cấp các liệu trình chăm sóc da chuyên sâu giúp bạn có làn da khỏe mạnh, tươi sáng.
                </p>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard key={index} name={service.name} image={service.image} />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
