import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PaySuccess = () => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const orderCode = sessionStorage.getItem("orderCode") || localStorage.getItem("orderCode");
    console.log("Received orderCode:", orderCode);
    const bookingId = sessionStorage.getItem("bookingId") || localStorage.getItem("bookingId");

    useEffect(() => {
        if (!orderCode) {
            setError("Order not found.");
            setLoading(false);
            return;
        }

        const fetchOrder = async () => {
            try {
                const response = await axios.get(`/api/appointments/${orderCode}`);
                setOrder(response.data);

                // Update booking status **only if** bookingId exists
                if (bookingId) {
                    await updateBookingStatus();
                }
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch order details.");
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderCode]); // bookingId is used only inside, no need to add in dependencies

    const updateBookingStatus = async () => {
        if (!bookingId) return;

        try {
            await axios.put(`/api/booking-requests/${bookingId}/status`, { status: "Completed" });
            console.log("Booking status updated successfully");
        } catch (error) {
            console.error("Error updating booking status:", error.response?.data?.message || error.message);
        }
    };



    if (loading) return <div className="text-center mt-6">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-6">{error}</div>;

    return (
        <div className="bg-gradient-to-r from-pink-100 to-pink-200 min-h-screen flex items-center justify-center p-4">
            <div className="max-w-lg w-full bg-white p-8 shadow-2xl rounded-3xl transform transition duration-500 hover:scale-105">
                <div className="text-center mb-6">
                    <h2 className="text-3xl font-extrabold text-pink-700">Payment Successful</h2>
                    <p className="text-gray-600">Thank you for your purchase!</p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-pink-700">Buyer Details</p>
                    <p className="text-sm text-gray-700 font-bold">Name: {order?.buyerName || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Email: {order?.buyerEmail || "N/A"}</p>
                    <p className="text-sm text-gray-700 font-bold">Phone: {order?.buyerPhone || "N/A"}</p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-pink-700">Receipt</p>
                    <p className="text-sm text-gray-600">Order ID: <span className="font-mono">{order?.appointmentCode}</span></p>
                    <p className="text-sm text-gray-600">
                        Transaction Date: {order?.transactionDateTime ? new Date(order.transactionDateTime).toLocaleString() : "N/A"}
                    </p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4">
                    <p className="text-lg font-semibold text-pink-700">Order Summary</p>
                    <p className="text-sm font-bold text-gray-700">Description: {order?.description || "N/A"}</p>
                    {/* <p className="text-sm font-bold text-gray-700">Payment Method: {order?.paymentMethod || "N/A"}</p> */}
                    <p className="text-sm font-bold text-gray-700">
                        Status: <span className="text-green-700">{order?.status || "N/A"}</span>
                    </p>
                </div>

                <div className="border-t border-pink-300 mt-4 pt-4 text-center">
                    <p className="text-lg font-semibold text-pink-700">Amount Paid</p>
                    <p className="text-4xl font-bold text-pink-700">
                        {order?.amount ? `${order.amount} ${order.currency}` : "N/A"}
                    </p>
                </div>

                <div className="flex justify-between mt-6">
                    <Link to={"/"} className="text-pink-700 flex items-center transition-colors hover:text-pink-900">
                        <ArrowBackIcon className="mr-1" /> Back
                    </Link>
                </div>
            </div>
        </div>
    );
};
