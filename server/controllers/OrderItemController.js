const OrderItem = require("../models/OrderItem");
const OrderProduct = require("../models/OrderProduct");

// Lấy tất cả sản phẩm của một đơn hàng
exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({ orderID: req.params.orderID }).populate("productID", "productName price imgURL description availability");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Thêm sản phẩm vào đơn hàng (nếu cần cập nhật sau khi tạo đơn)
exports.addOrderItem = async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;

    if (!orderID || !productID || !quantity) {
      return res.status(400).json({ message: "Thiếu dữ liệu đầu vào." });
    }

    // Kiểm tra OrderProduct tồn tại và thuộc về user hiện tại
    const order = await OrderProduct.findById(orderID);
    if (!order) {
      return res.status(404).json({ message: "Order không tồn tại" });
    }
    if (order.customerID.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không có quyền thêm item vào đơn này" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Chỉ thêm sản phẩm khi đơn hàng đang ở trạng thái Pending" });
    }

    const newOrderItem = new OrderItem({
      orderID,
      productID,
      quantity,
    });

    await newOrderItem.save();

    res.status(201).json({ message: "Đã thêm sản phẩm vào đơn hàng", item: newOrderItem });
  } catch (error) {
    console.error("Lỗi chi tiết:", error);
    res.status(500).json({ error: "Thêm sản phẩm thất bại", details: error.message });
  }
};

// Cập nhật số lượng sản phẩm trong đơn hàng
exports.updateOrderItemQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: "Số lượng không hợp lệ." });
    }

    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order item không tồn tại" });
    }

    const order = await OrderProduct.findById(orderItem.orderID);
    if (!order || order.customerID.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không có quyền cập nhật item này" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Chỉ cập nhật sản phẩm khi đơn hàng đang ở trạng thái Pending" });
    }

    orderItem.quantity = quantity;
    await orderItem.save();

    res.status(200).json({ message: "Đã cập nhật số lượng sản phẩm", item: orderItem });
  } catch (error) {
    console.error("Lỗi chi tiết:", error);
    res.status(500).json({ error: "Cập nhật số lượng thất bại", details: error.message });
  }
};

// Xóa sản phẩm khỏi đơn hàng
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order item không tồn tại" });
    }

    const order = await OrderProduct.findById(orderItem.orderID);
    if (!order || order.customerID.toString() !== req.user.id) {
      return res.status(403).json({ message: "Bạn không có quyền xóa item này" });
    }
    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Chỉ xóa sản phẩm khi đơn hàng đang ở trạng thái Pending" });
    }

    await orderItem.deleteOne();
    res.status(200).json({ message: "Đã xóa sản phẩm khỏi đơn hàng" });
  } catch (error) {
    res.status(500).json({ error: "Xóa sản phẩm thất bại" });
  }
};
