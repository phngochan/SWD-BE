import React, { useEffect, useState } from "react";
import axios from "../../utils/axiosInstance";
import StaffSidebar from "../../components/StaffSidebar";
import { Pagination } from "@mui/material"; // Import Pagination component


const ITEMS_PER_PAGE = 10; // Number of orders per page

const ViewOrder = () => {
    const [currentPage, setCurrentPage] = useState(1);
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

    const sortedOrders = orders.sort((a, b) => {
        if (a.status === "Pending" && b.status !== "Pending") return -1;
        if (a.status !== "Pending" && b.status === "Pending") return 1;
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by creation date, newest first
    });

    const totalPages = Math.ceil(sortedOrders.length / ITEMS_PER_PAGE); // Calculate total pages
    const currentOrders = sortedOrders.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); // Get orders for current page

    return (
        <div className="flex">
            <StaffSidebar />
            <div className="p-4 w-full">
                <h1 className="text-2xl font-bold mb-4">Xem đơn hàng</h1>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500">{error}</p>}

                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2 text-center">Khách hàng</th>
                            <th className="border p-2 text-center">Sản phẩm</th>
                            <th className="border p-2 text-center">Số lượng</th>
                            <th className="border p-2 text-center">Tổng tiền</th>
                            <th className="border p-2 text-center">Thanh toán</th>
                            <th className="border p-2 text-center">Trạng thái</th>
                            <th className="border p-2 text-center">Hành động</th>
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
                                        order.status === "Completed" ? "bg-green-200" :
                                            order.status === "Cancelled" ? "bg-purple-200" : "bg-red-200"
                                        }`}>
                                        {order.status === "Pending" ? "Chờ xác nhận" : order.status === "Completed" ? "Đã xác nhận" : order.status === "Cancelled" ? "Đã hủy" : order.status}
                                    </span>
                                </td>
                                <td className="border p-2 text-center">
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                        className="border p-1"
                                    >
                                        <option value="Pending" className="bg-yellow-200">Chờ xác nhận</option>
                                        <option value="Completed" className="bg-green-200">Đã hoàn thành</option>
                                        <option value="Cancelled" className="bg-red-200">Hủy</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-center mt-4">
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(event, value) => setCurrentPage(value)}
                        color="primary"
                    />
                </div>

            </div>
        </div>
    );
};

export default ViewOrder;
