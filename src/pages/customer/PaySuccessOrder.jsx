import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PaySuccessOrder = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const orderCode = sessionStorage.getItem("orderCode") || localStorage.getItem("orderCode");
    console.log("Received orderCode:", orderCode);

    useEffect(() => {
        if (!orderCode) {
            setError("Order not found.");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/orders/${orderCode}`);
                setOrder(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch order details.");
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderCode]);

    if (loading) return <div className="text-center mt-6">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

    return (
        <div className="bg-gradient-to-r from-green-100 to-green-200 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white p-8 shadow-2xl rounded-3xl transform transition duration-500 hover:scale-105">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-green-700">Payment Successful</h2>
                    <p className="text-gray-600">Thank you for your purchase!</p>
                </div>

                <div className="border-t border-green-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-green-700">Buyer Details</p>
                    <p className="text-sm text-gray-700 font-bold">Name: {order?.customerID?.firstName} {order?.customerID?.lastName || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Email: {order?.customerID?.email || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Phone: {order?.customerID?.phoneNumber || "N/A"}</p>
                </div>

                <div className="border-t border-green-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-green-700">Receipt</p>
                    <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{order?.orderCode}</span></p>
                    <p className="text-sm text-gray-600">
                        Transaction Date: {order?.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A"}
                    </p>
                </div>

                <div className="border-t border-green-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-green-700">Order Summary</p>
                    <p className="text-sm font-bold text-gray-700">Description: {order?.description || "N/A"}</p>
                    <p className="text-sm font-bold text-gray-700">
                        Status: <span className="text-green-700">{order?.status || "N/A"}</span>
                    </p>
                </div>

                <div className="border-t border-green-300 mt-4 pt-4 text-center">
                    <p className="text-lg font-semibold text-green-700">Amount Paid</p>
                    <p className="text-4xl font-bold text-green-700">
                        {order?.totalPrice ? `${order.totalPrice} ${order.currency}` : "N/A"}
                    </p>
                </div>

                <div className="flex justify-between mt-6">
                    <Link to={"/view-orders"} className="text-green-700 flex items-center transition-colors hover:text-green-900">
                        <ArrowBackIcon className="mr-1" /> Back
                    </Link>
                </div>
            </div>
        </div>
    );
};
