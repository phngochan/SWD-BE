import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false); // State for login modal
  const [showQuantityModal, setShowQuantityModal] = useState(false); // State for quantity modal
  const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
  const [quantity, setQuantity] = useState(1); // State for quantity
  const [items, setItems] = useState([]);

  const token = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  const navigate = useNavigate(); // Initialize useNavigate

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

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Function to add product to cart
  const addToCart = async (product) => {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setSelectedProduct(product);
    setShowQuantityModal(true);
  };

  const handleAddToCart = async () => {
    const updatedCart = [...cart, { ...selectedProduct, quantity }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save cart to localStorage

    try {
      let orderID = localStorage.getItem("orderID");
      if (!orderID) {
        const orderResponse = await axios.post("/api/orders", {
          items: [{ productID: selectedProduct._id, quantity }],
        });
        orderID = orderResponse.data.order._id;
        localStorage.setItem("orderID", orderID);
      } else {
        await axios.post("/api/order-items", {
          orderID,
          productID: selectedProduct._id,
          quantity,
        });
      }
    } catch (error) {
      console.error("Failed to add item to order:", error.response?.data || error.message);
    }

    setShowQuantityModal(false);
    setQuantity(1);
  };

  const handleLoginRedirect = () => {
    setShowLoginModal(false);
    navigate("/dang-nhap");
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/api/orders", { items: cart });
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/order-success", { state: { orderId: response.data.order._id } });
    } catch (error) {
      console.error("Checkout failed:", error);
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
      <Navbar cart={cart} setCart={setCart} /> {/* Pass setCart to Navbar */}

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

      {/* Custom Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Đăng nhập để thêm sản phẩm vào giỏ hàng
            </h3>
            <p className="text-gray-600">Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng. Bạn có muốn đăng nhập không?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowLoginModal(false)}
              >
                Đóng
              </button>
              <button
                className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
                onClick={handleLoginRedirect}
              >
                Đăng nhập
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quantity Modal */}
      {showQuantityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Chọn số lượng sản phẩm
            </h3>
            <div className="flex justify-center items-center mb-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-l-lg hover:bg-gray-400 transition"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                -
              </button>
              <span className="px-4 py-2 bg-white text-gray-800 border border-gray-300">
                {quantity}
              </span>
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-r-lg hover:bg-gray-400 transition"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                onClick={() => setShowQuantityModal(false)}
              >
                Đóng
              </button>
              <button
                className="py-2 px-6 bg-[#A7DFEC] text-white rounded-lg hover:bg-[#2B6A7C] transition"
                onClick={handleAddToCart}
              >
                Thêm vào giỏ hàng
              </button>
            </div>
          </div>
        </div>
      )}

      {cart.length > 0 && (
        <div className="text-center mt-8">
          <button
            onClick={handleCheckout}
            className="px-6 py-3 bg-[#A7DFEC] text-white rounded-full hover:bg-[#2B6A7C] transition duration-300"
          >
            Thanh toán
          </button>
        </div>
      )}
    </div>
  );
}
