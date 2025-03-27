import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function ProductDetail() {
    const [cart, setCart] = useState([]);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("cash"); // Default payment method
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const fetchOrderItems = async () => {
            const orderID = localStorage.getItem("orderID");
            if (orderID) {
                try {
                    const response = await axios.get(`/api/order-items/${orderID}`);
                    setCart(response.data);
                } catch (err) {
                    console.error("Failed to fetch order items:", err);
                    // If error -> fallback to localStorage cart
                    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                    setCart(storedCart);
                }
            } else {
                const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
                setCart(storedCart);
            }
        };

        fetchOrderItems();
    }, []);

    const handleQuantityChange = async (index, newQuantity) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        try {
            await axios.put(`/api/order-items/${updatedCart[index]._id}`, {
                quantity: newQuantity,
            });
            // Update total price in the OrderProduct document
            await updateTotalPrice();
        } catch (error) {
            console.error("Failed to update item quantity:", error);
        }
    };

    const handleDeleteItem = async (index) => {
        const updatedCart = [...cart];
        const itemId = updatedCart[index]._id;
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        try {
            await axios.delete(`/api/order-items/${itemId}`);
            // Update total price in the OrderProduct document
            await updateTotalPrice();
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const updateTotalPrice = async () => {
        const orderID = localStorage.getItem("orderID");
        if (!orderID) return;

        const totalPrice = cart.reduce((total, product) => total + (product.productID?.price || 0) * product.quantity, 0);

        try {
            await axios.put(`/api/orders/${orderID}/total-price`, { totalPrice });
        } catch (error) {
            console.error("Failed to update total price:", error);
        }
    };

    const handleCheckout = () => {
        setShowCheckoutModal(true);
    };

    const handleConfirmCheckout = async () => {
        const orderID = localStorage.getItem("orderID");

        if (!orderID) {
            alert("Không tìm thấy đơn hàng. Vui lòng thử lại.");
            return;
        }

        setIsProcessing(true); // disable button while processing

        if (paymentMethod === "cash") {
            try {
                const response = await axios.put(`/api/orders/${orderID}/status`, {
                    status: "Confirmed",
                    paymentMethod: "cash", // Add payment method
                });

                if (response.status === 200) {
                    handleSuccessPayment();
                } else {
                    alert("Cập nhật không thành công. Vui lòng thử lại.");
                }
            } catch (err) {
                const errorMsg = err.response?.data?.message || "Có lỗi khi cập nhật trạng thái đơn hàng! Vui lòng thử lại.";
                console.error("Lỗi khi cập nhật trạng thái:", err);
                alert(errorMsg);
            } finally {
                setIsProcessing(false);
            }
        } else if (paymentMethod === "bank") {
            try {
                const response = await axios.post(`/api/payments/order/${orderID}`);
                const { checkoutUrl } = response.data.data;

                if (checkoutUrl) {
                    window.location.href = checkoutUrl;

                    // Update order status to "Completed"
                    await axios.put(`/api/orders/${orderID}/status`, {
                        status: "Completed",
                        paymentMethod: "banking", // Add payment method
                    });

                    handleSuccessPayment();
                } else {
                    alert("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
                }
            } catch (error) {
                console.error("Lỗi khi tạo liên kết thanh toán:", error);
                alert("Không thể tạo liên kết thanh toán. Vui lòng thử lại.");
            } finally {
                setIsProcessing(false);
            }
        }
    };

    // Handle successful payment
    const handleSuccessPayment = () => {
        setShowPopup(true);

        // Clear orderID and cart after successful payment
        localStorage.removeItem("orderID");
        localStorage.removeItem("cart");
        setCart([]);

        setTimeout(() => {
            setShowPopup(false);
            navigate("/sản phẩm");
        }, 3000);

        setShowCheckoutModal(false);
    };


    const handleCancelCheckout = () => {
        setShowCheckoutModal(false);
        navigate("/product-detail");
    };

    const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);

    const totalPrice = cart.reduce((total, product) => total + (product.productID?.price || 0) * product.quantity, 0);

    return (
        <div className="bg-[#F5F5F5] min-h-screen">
            <Navbar cart={cart} setCart={setCart} />

            <div className="max-w-5xl mx-auto px-6 py-16 text-[#2B6A7C]">
                <h2 className="text-3xl font-bold text-center mb-8">Chi tiết giỏ hàng</h2>
                {cart.length === 0 ? (
                    <p className="text-center">Giỏ hàng của bạn đang trống.</p>
                ) : (
                    <div>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b text-center">Hình ảnh</th>
                                    <th className="px-4 py-2 border-b text-center">Tên sản phẩm</th>
                                    <th className="px-4 py-2 border-b">Mô tả</th>
                                    <th className="px-4 py-2 border-b text-center">Giá</th>
                                    <th className="px-4 py-2 border-b text-center">Tình trạng</th>
                                    <th className="px-4 py-2 border-b text-center">Số lượng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-100 transition duration-300">
                                        <td className="px-4 py-2 border-b text-center">
                                            <img
                                                src={product.productID?.imgURL || "/images/default-product.png"}
                                                className="w-24 h-24 object-cover mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">{product.productID?.productName}</td>
                                        <td className="px-4 py-2 border-b">{product.productID?.description}</td>
                                        <td className="px-4 py-2 border-b text-lg font-bold text-[#2B6A7C] text-center">
                                            {(product.productID?.price || 0).toLocaleString()} VND
                                        </td>
                                        <td className="px-4 py-2 border-b text-center text-lg font-bold text-[#2B6A7C]">
                                            {((product.productID?.price || 0) * product.quantity).toLocaleString()} VND {/* Total price */}
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <input
                                                type="number"
                                                value={product.quantity}
                                                min="1"
                                                onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                                                className="w-12 text-center border rounded"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">
                                            <button
                                                onClick={() => handleDeleteItem(index)}
                                                className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition duration-300"
                                            >
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                            className="px-6 py-3 bg-[#FF5722] text-white rounded-full hover:bg-[#E64A19] transition duration-300"
                        >
                            Thanh toán
                        </button>
                    </div>
                )}
            </div>

            <Footer />

            {showCheckoutModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full text-center">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Xác nhận thanh toán</h3>
                        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-b text-center">Hình ảnh</th>
                                    <th className="px-4 py-2 border-b text-center">Tên sản phẩm</th>
                                    <th className="px-4 py-2 border-b text-center">Số lượng</th>
                                    <th className="px-4 py-2 border-b text-center">Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-100 transition duration-300">
                                        <td className="px-4 py-2 border-b text-center">
                                            <img
                                                src={product.productID?.imgURL || "/images/default-product.png"}
                                                className="w-24 h-24 object-cover mx-auto"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border-b text-center">{product.productID?.productName}</td>
                                        <td className="px-4 py-2 border-b text-center">{product.quantity}</td>
                                        <td className="px-4 py-2 border-b text-lg font-bold text-[#2B6A7C] text-center">
                                            {(product.productID?.price || 0).toLocaleString()} VND
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-center mt-4">
                            <p className="text-lg font-bold">Tổng số tiền: {totalPrice.toLocaleString()} VND</p>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="cash"
                                    checked={paymentMethod === "cash"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Tiền mặt
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank"
                                    checked={paymentMethod === "bank"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                    className="mr-2"
                                />
                                Chuyển khoản
                            </label>
                        </div>
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                className="py-2 px-6 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                                onClick={handleCancelCheckout}
                            >
                                Hủy
                            </button>
                            <button
                                className="py-2 px-6 bg-[#FF5722] text-white rounded-lg hover:bg-[#E64A19] transition"
                                onClick={handleConfirmCheckout}
                            >
                                Chọn
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
