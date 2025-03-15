// import { Link } from "react-router-dom";
// import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
// import Navbar from "../../components/Navbar";
// import Footer from "../../components/Footer";

// const skincareRoutines = [
//     {
//         name: "Lộ trình chăm sóc da cơ bản",
//         description: "Dành cho người mới bắt đầu với các bước cơ bản giúp duy trì làn da khỏe mạnh.",
//         products: [
//             { name: "Sữa rửa mặt dịu nhẹ", image: "/images/cleanser.png" },
//             { name: "Toner cấp ẩm", image: "/images/toner.png" },
//             { name: "Kem dưỡng ẩm", image: "/images/moisturizer.png" }
//         ]
//     },
//     {
//         name: "Lộ trình dưỡng trắng",
//         description: "Tập trung vào làm sáng và đều màu da với các sản phẩm đặc trị.",
//         products: [
//             { name: "Serum vitamin C", image: "/images/serum.png" },
//             { name: "Mặt nạ dưỡng trắng", image: "/images/mask.png" },
//             { name: "Kem chống nắng", image: "/images/sunscreen.png" }
//         ]
//     },
//     {
//         name: "Lộ trình trị mụn",
//         description: "Giúp giảm mụn và ngăn ngừa mụn tái phát với các sản phẩm chuyên dụng.",
//         products: [
//             { name: "Gel trị mụn", image: "/images/acne-gel.png" },
//             { name: "Nước hoa hồng làm dịu da", image: "/images/rose-water.png" },
//             { name: "Kem dưỡng phục hồi da", image: "/images/healing-cream.png" }
//         ]
//     }
// ];

// export default function Product() {
//     return (
//         <div className="bg-[#F5F5F5] min-h-screen">
//             <Navbar />

//             <div className="h-[500px] w-full flex items-center justify-center text-white text-center"
//                 style={{
//                     backgroundImage: "url('/images/service.png')",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                     backgroundRepeat: "no-repeat",
//                     backgroundAttachment: "fixed"
//                 }}>
//                 <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">Sản phẩm chăm sóc da</h1>
//             </div>

//             <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
//                 {skincareRoutines.map((routine, index) => (
//                     <div key={index} className="mb-12">
//                         <h2 className="text-3xl font-bold text-center mb-4">{routine.name}</h2>
//                         <p className="text-lg text-center leading-relaxed pb-4">{routine.description}</p>
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//                             {routine.products.map((product, idx) => (
//                                 <div key={idx} className="flex flex-col items-center">
//                                     <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#00000000]">
//                                         <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
//                                     </div>
//                                     <h3 className="text-xl font-semibold mt-3">{product.name}</h3>
//                                     <button className="mt-3 px-7 py-1 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C]">Mua ngay</button>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <Footer />
//         </div>
//     );
// }
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <div
        className="h-[500px] w-full flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('/images/service.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
        }}
      >
        <h1 className="text-5xl font-semibold bg-opacity-50 px-6 py-4 rounded-lg">
          Sản phẩm chăm sóc da
        </h1>
      </div>

      {/* Product List */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
        <h2 className="text-3xl font-bold text-center mb-8">Danh sách sản phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="w-full h-48 overflow-hidden">
                <img
                  src={product.imgURL || "/images/default-product.png"}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.productName}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <p className="text-lg font-bold text-[#2B6A7C] mb-4">
                  {product.price.toLocaleString()} VND
                </p>
                <p
                  className={`text-sm mb-4 ${
                    product.availability ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {product.availability ? "Còn hàng" : "Hết hàng"}
                </p>
                <button
                  className="w-full px-4 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C] transition duration-300"
                  disabled={!product.availability}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
