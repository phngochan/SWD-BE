import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const skincareRoutines = [
    {
        name: "Lộ trình chăm sóc da cơ bản",
        description: "Dành cho người mới bắt đầu với các bước cơ bản giúp duy trì làn da khỏe mạnh.",
        products: [
            { name: "Sữa rửa mặt dịu nhẹ", image: "/images/cleanser.png" },
            { name: "Toner cấp ẩm", image: "/images/toner.png" },
            { name: "Kem dưỡng ẩm", image: "/images/moisturizer.png" }
        ]
    },
    {
        name: "Lộ trình dưỡng trắng",
        description: "Tập trung vào làm sáng và đều màu da với các sản phẩm đặc trị.",
        products: [
            { name: "Serum vitamin C", image: "/images/serum.png" },
            { name: "Mặt nạ dưỡng trắng", image: "/images/mask.png" },
            { name: "Kem chống nắng", image: "/images/sunscreen.png" }
        ]
    },
    {
        name: "Lộ trình trị mụn",
        description: "Giúp giảm mụn và ngăn ngừa mụn tái phát với các sản phẩm chuyên dụng.",
        products: [
            { name: "Gel trị mụn", image: "/images/acne-gel.png" },
            { name: "Nước hoa hồng làm dịu da", image: "/images/rose-water.png" },
            { name: "Kem dưỡng phục hồi da", image: "/images/healing-cream.png" }
        ]
    }
];

export default function AdditionalProducts() {
    const navigate = useNavigate();
    const [selectedCount, setSelectedCount] = useState(0);

    const handleSelectProduct = () => {
        console.log("Product selected!");
        setSelectedCount((prevCount) => prevCount + 1);
    };

    const handleYes = () => {
        // Logic for adding more products
        alert("Redirecting to skincare products page...");
        // navigate to skincare products page
    };

    const handleNo = () => {
        // Logic for not adding more products
        alert("Thank you for your booking!");
        navigate("/");
    };
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
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Sản phẩm chăm sóc da</h1>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                {skincareRoutines.map((routine, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-3xl font-bold text-center mb-4">{routine.name}</h2>
                        <p className="text-lg text-center leading-relaxed pb-4">{routine.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {routine.products.map((product, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00000000]">
                                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
                                    <button
                                        className="mt-3 px-7 py-1 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]"
                                        onClick={handleSelectProduct}
                                    >
                                        Chọn
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                <div className="max-w-2xl mx-auto p-6 mt-20 bg-[#E0F7FA] rounded-lg shadow-lg border border-[#A7DFEC]">
                    <h2 className="text-center text-2xl font-bold text-[#2B6A7C] my-4 mb-6">
                        {selectedCount === 0
                            ? "Bạn đã chọn những sản phẩm mình mong muốn ?"
                            : `Bạn đã chọn ${selectedCount} sản phẩm bổ sung`
                        }
                    </h2>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            className="bg-[#A7DFEC] text-white px-4 py-2 rounded-lg"
                            onClick={handleYes}
                            aria-label="Yes"
                        >
                            Hoàn tất
                        </button>
                        <button
                            className="text-gray-500"
                            onClick={handleNo}
                            aria-label="No"
                        >
                            Hủy bỏ
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
