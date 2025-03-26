import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";

export const PayFailed = () => {
    const orderCode = sessionStorage.getItem("orderCode") || localStorage.getItem("orderCode");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/appointments/${orderCode}`);
                setOrder(response.data);
            } catch (error) {
                setError("Failed to fetch order details.");
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderCode]);

    if (loading) return <div className="text-center mt-6 h-screen">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

    return (
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white p-8 shadow-2xl rounded-3xl transform transition duration-500 hover:scale-105">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-red-600">Thanh toán thất bại</h2>
                    <p className="text-gray-600">Vui lòng thử lại.</p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-pink-700">Thông tin người mua</p>
                    <p className="text-sm text-gray-700 font-bold">Tên: {order?.buyerName || "Không có"}</p>
                    <p className="text-sm text-gray-700 font-bold">Email: {order?.buyerEmail || "Không có"}</p>
                    <p className="text-sm text-gray-700 font-bold">Số điện thoại: {order?.buyerPhone || "Không có"}</p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-pink-700">Hóa đơn</p>
                    <p className="text-sm text-gray-600">Mã đơn hàng: <span className="font-mono">{order?.appointmentCode}</span></p>
                    <p className="text-sm text-gray-600">
                        Ngày giao dịch: {order?.transactionDateTime ? new Date(order.transactionDateTime).toLocaleString() : "Không có"}
                    </p>
                </div>

                <div className="flex justify-between mt-6">
                    <Link to={"/view-booking"} className="text-pink-700 flex transition-colors hover:text-pink-900">
                        Quay lại trang chủ
                    </Link>
                </div>
            </div>
        </div>
    );
};
