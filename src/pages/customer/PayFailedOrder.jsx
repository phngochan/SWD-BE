import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";

export const PayFailedOrder = () => {
    const orderCode = sessionStorage.getItem("orderCode") || localStorage.getItem("orderCode");
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderCode}`);
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
        <div className="bg-gradient-to-r from-red-100 to-red-200 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white p-8 shadow-2xl rounded-3xl transform transition duration-500 hover:scale-105">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-red-600">Payment Failed</h2>
                    <p className="text-gray-600">Please try again.</p>
                </div>

                <div className="border-t border-red-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-red-700">Buyer Details</p>
                    <p className="text-sm text-gray-700 font-bold">Name: {order?.customerID?.firstName} {order?.customerID?.lastName || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Email: {order?.customerID?.email || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Phone: {order?.customerID?.phoneNumber || "N/A"}</p>
                </div>

                <div className="border-t border-red-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-red-700">Receipt</p>
                    <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{order?.orderCode}</span></p>
                    <p className="text-sm text-gray-600">
                        Transaction Date: {order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                    </p>
                </div>

                <div className="flex justify-between mt-6">
                    <Link to={"/view-orders"} className="text-red-700 flex transition-colors hover:text-red-900">
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};
