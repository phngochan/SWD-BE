import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import StaffSidebar from "../../components/StaffSidebar";

const ViewOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/orders");
                setOrders(response.data);
            } catch (err) {
                setError(err.response?.data?.message || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
            setOrders((prev) =>
                prev.map((order) =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (err) {
            setError(err.response?.data?.message || "Failed to update order status");
        }
    };

    return (
        <div className="flex">
            <StaffSidebar />
            <div className="p-4 w-full">
                <h1 className="text-2xl font-bold mb-4">View Orders</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 text-center">Customer</th>
                            <th className="border p-2 text-center">Product</th>
                            <th className="border p-2 text-center">Quantity</th>
                            <th className="border p-2 text-center">Total Price</th>
                            <th className="border p-2 text-center">Payment</th>
                            <th className="border p-2 text-center">Status</th>
                            <th className="border p-2 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id} className="border">
                                <td className="border p-2 text-center">
                                    {order.customerID?.firstName} {order.customerID?.lastName}
                                </td>
                                <td className="border p-2 text-center">{order.productID?.name}</td>
                                <td className="border p-2 text-center">{order.quantity}</td>
                                <td className="border p-2 text-center">${order.totalPrice}</td>
                                <td className="border p-2 text-center">
                                    <span className={`p-1 rounded ${order.paymentStatus === "Paid" ? "bg-green-200" : "bg-red-200"}`}>
                                        {order.paymentStatus}
                                    </span>
                                </td>
                                <td className="border p-2 text-center">
                                    <span className={`p-1 rounded ${order.status === "Pending" ? "bg-yellow-200" :
                                        order.status === "Confirmed" ? "bg-blue-200" :
                                            order.status === "Cancelled" ? "bg-purple-200" : "bg-red-200"
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="border p-2 text-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className="border p-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default ViewOrder;
