import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const handleCheckout = () => {
        // Handle checkout logic here
        navigate("/products");
    };

    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
    const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navbar cart={cart} setCart={setCart} />

            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                <h2 className="text-3xl font-bold text-center mb-8">Chi tiết giỏ hàng</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {cart.map((product, index) => (
                                <div
                                    key={index}
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
                                        <p className="text-sm mb-4">Số lượng: {product.quantity}</p> {/* Display quantity */}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <p className="text-lg font-bold">Tổng số sản phẩm: {totalQuantity}</p>
                            <p className="text-lg font-bold">Tổng số tiền: {totalPrice.toLocaleString()} VND</p>
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

            <Footer />
        </div>
    );
}
