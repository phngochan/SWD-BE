const OrderProduct = require("../models/OrderProduct");

// Tạo đơn hàng sản phẩm
exports.createOrder = async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    if (!productID || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newOrder = new OrderProduct({
      customerID: req.user.id,
      productID,
      quantity,
      status: "Pending",
    });

    const order = await newOrder.save();
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Lấy danh sách đơn hàng
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderProduct.find()
      .populate("customerID", "firstName lastName email")
      .populate("productID", "name price");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validTransitions = {
      "Pending": ["Confirmed", "Cancelled"],
      "Confirmed": ["Cancelled"],
    };

    const order = await OrderProduct.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!validTransitions[order.status].includes(status)) {
      return res.status(400).json({ message: `Invalid status transition from '${order.status}' to '${status}'` });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy danh sách đơn hàng của khách hàng
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await OrderProduct.find({ customerID: req.user.id })
      .populate("productID", "name price");
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// Hủy đơn hàng
exports.cancelOrder = async (req, res) => {
  try {
    const order = await OrderProduct.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.customerID.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden: You can only cancel your own order" });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({ message: "Only 'Pending' orders can be cancelled" });
    }

    order.status = "Cancelled";
    await order.save();
    res.status(200).json({ message: "Order cancelled successfully", order });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
