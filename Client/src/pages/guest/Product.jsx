import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

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

  const addToCart = async (product) => {
    if (!token) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      // const orderID = localStorage.getItem("orderID"); // Lấy orderID từ localStorage hoặc state nếu có
      const response = await axios.post(
        "/api/order-items",
        {
          // orderID: orderID, // ID của đơn hàng hiện tại
          productID: product._id,
          quantity: 1, // Số lượng sản phẩm, mặc định là 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
      } else {
        alert("Thêm vào giỏ hàng thất bại.");
      }
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ hàng:", error);
      alert("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng.");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar cart={cart} />

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
                  className={`text-sm mb-4 ${product.availability ? "text-green-500" : "text-red-500"}`}
                >
                  {product.availability ? "Còn hàng" : "Hết hàng"}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full px-4 py-2 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C] transition duration-300"
                  disabled={!product.availability}
                >
                  Thêm vào giỏ hàng
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
