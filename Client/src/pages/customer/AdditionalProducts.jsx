import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
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
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const handleSelectProduct = (product) => {
        setSelectedProducts((prevProducts) => [...prevProducts, product]);
    };

    const handleRemoveProduct = (product) => {
        setSelectedProducts((prevProducts) => {
            const indexToRemove = prevProducts.findIndex((p) => p.name === product.name);
            if (indexToRemove === -1) return prevProducts; // Nếu không tìm thấy, giữ nguyên danh sách

            // Tạo một bản sao danh sách và xóa chỉ một sản phẩm
            const updatedProducts = [...prevProducts];
            updatedProducts.splice(indexToRemove, 1);
            return updatedProducts;
        });
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
                <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">
                    Sản phẩm chăm sóc da
                </h1>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                {skincareRoutines.map((routine, index) => (
                    <div key={index} className="mb-12">
                        <h2 className="text-3xl font-bold text-center mb-4">{routine.name}</h2>
                        <p className="text-lg text-center leading-relaxed pb-4">{routine.description}</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {routine.products.map((product, idx) => (
                                <div key={idx} className="flex flex-col items-center">
                                    <img src={product.image} alt={product.name} className="w-48 h-48 rounded-full border-4" />
                                    <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
                                    <button
                                        className="mt-3 px-7 py-1 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]"
                                        onClick={() => handleSelectProduct(product)}
                                    >
                                        Chọn
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <div className="max-w-2xl mx-auto p-6 mt-20 bg-[#E0F7FA] rounded-lg shadow-lg border">
                    <h2 className="text-center text-2xl font-bold text-[#2B6A7C] my-4">
                        {selectedProducts.length === 0 ? "Bạn đã chọn những sản phẩm mình mong muốn ?" : (
                            <>Bạn đã chọn <span className="text-3xl font-extrabold text-[#eb7a69] cursor-pointer hover:underline" onClick={() => setIsPopupOpen(true)}>{selectedProducts.length} sản phẩm</span> bổ sung</>
                        )}
                    </h2>
                    <div className="flex justify-center gap-4 mt-4">
                        <button className="bg-[#A7DFEC] text-white px-4 py-2 rounded-lg" onClick={() => navigate("/skincare-products")}>Hoàn tất</button>
                        <button className="text-gray-500" onClick={() => navigate("/")}>Hủy bỏ</button>
                    </div>
                </div>
            </div>

            <Footer />

            {isPopupOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-[580px] border transform scale-95">
                        <h2 className="text-2xl font-bold text-center text-[#2B6A7C] mb-5">🛍 Sản phẩm đã chọn</h2>
                        <div className="max-h-60 overflow-y-auto space-y-3">
                            {selectedProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <img src={product.image} alt={product.name} className="w-14 h-14 rounded-full border" />
                                        <span className="text-lg font-medium">{product.name}</span>
                                    </div>
                                    <button className="text-red-500 hover:text-red-700" onClick={() => handleRemoveProduct(product)}>✖</button>
                                </div>
                            ))}
                        </div>

                        <button className="mt-5 w-full py-2 bg-[#A7DFEC] text-white text-lg font-semibold rounded-lg hover:bg-[#2B6A7C]" onClick={() => setIsPopupOpen(false)}>Đóng</button>
                    </div>
                </div>
            )}
        </div>
    );
}
