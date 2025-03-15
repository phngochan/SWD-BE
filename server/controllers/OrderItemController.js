const OrderItem = require("../models/OrderItem");

// Lấy tất cả sản phẩm của một đơn hàng
exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({ orderID: req.params.orderID }).populate("productID", "name price");
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Thêm sản phẩm vào đơn hàng (nếu cần cập nhật sau khi tạo đơn)
exports.addOrderItem = async (req, res) => {
  try {
    const { orderID, productID, quantity } = req.body;

    const newOrderItem = new OrderItem({
      orderID,
      productID,
      quantity,
    });

    await newOrderItem.save();
    res.status(201).json({ message: "Order item added successfully", newOrderItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to add order item" });
  }
};

// Xóa sản phẩm khỏi đơn hàng
exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    await orderItem.deleteOne();
    res.status(200).json({ message: "Order item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order item" });
  }
};
