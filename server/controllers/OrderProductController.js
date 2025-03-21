const OrderProduct = require("../models/OrderProduct");
const OrderItem = require("../models/OrderItem");

// Tạo đơn hàng sản phẩm
exports.createOrder = async (req, res) => {
  try {
    const { items } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item" });
    }

    // Tạo đơn hàng chính
    const newOrder = new OrderProduct({ customerID: req.user.id, status: "Pending" });
    const savedOrder = await newOrder.save();

    // Tạo các order item
    const orderItems = await Promise.all(
      items.map(async (item) => {
        const orderItem = new OrderItem({
          orderID: savedOrder._id,
          productID: item.productID,
          quantity: item.quantity
        });
        return await orderItem.save();
      })
    );

    res.status(201).json({ order: savedOrder, items: orderItems });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderProduct.find()
      .populate("customerID", "firstName lastName email");

    const results = await Promise.all(orders.map(async (order) => {
      const items = await OrderItem.find({ orderID: order._id })
        .populate("productID", "name price");
      return { ...order.toObject(), items };
    }));

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 🔹 Cập nhật trạng thái đơn hàng
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validTransitions = {
      "Pending": ["Confirmed", "Cancelled"],
      "Confirmed": ["Cancelled"]
    };

    const order = await OrderProduct.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (!validTransitions[order.status] || !validTransitions[order.status].includes(status)) {
      return res.status(400).json({ message: `Invalid status transition from '${order.status}' to '${status}'` });
    }

    order.status = status;
    await order.save();
    res.status(200).json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// 🔹 Lấy danh sách đơn hàng của khách hàng
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await OrderProduct.find({ customerID: req.user.id });

    const results = await Promise.all(orders.map(async (order) => {
      const items = await OrderItem.find({ orderID: order._id })
        .populate("productID", "name price");
      return { ...order.toObject(), items };
    }));

    res.json({ orders: results });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// 🔹 Hủy đơn hàng
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

exports.getOrderById = async (req, res) => {
  try {
    const order = await OrderProduct.findById(req.params.id)
      .populate("customerID", "firstName lastName email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    const items = await OrderItem.find({ orderID: order._id })
      .populate("productID", "productName price");

    res.status(200).json({ ...order.toObject(), items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy giỏ hàng dựa trên customer ID
exports.getCartByCustomerId = async (req, res) => {
  try {
    const customerID = req.user.id;
    const order = await OrderProduct.findOne({ customerID, status: "Pending" })
      .populate("customerID", "firstName lastName email");

    if (!order) return res.status(404).json({ message: "Cart not found" });

    const items = await OrderItem.find({ orderID: order._id })
      .populate("productID", "productName price imgURL description availability");

    res.status(200).json({ ...order.toObject(), items });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.mergeOrdersByCustomer = async (req, res) => {
  try {
    const { customerID } = req.body;

    // Lấy tất cả các đơn hàng chưa thanh toán (hoặc status bạn muốn)
    const orders = await Order.find({
      customerID: customerID,
      status: 'pending'
    }).populate('orderItems.productID');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: 'Không có đơn hàng nào để gộp.' });
    }

    // Gộp các orderItems (nếu trùng sản phẩm thì cộng dồn số lượng)
    const mergedItemsMap = {};

    orders.forEach(order => {
      order.orderItems.forEach(item => {
        const productID = item.productID._id.toString();
        if (mergedItemsMap[productID]) {
          mergedItemsMap[productID].quantity += item.quantity;
        } else {
          mergedItemsMap[productID] = {
            productID: item.productID._id,
            quantity: item.quantity
          };
        }
      });
    });

    const mergedItems = Object.values(mergedItemsMap);

    // Tạo đơn hàng mới đã gộp
    const newOrder = await Order.create({
      customerID: customerID,
      orderItems: mergedItems,
      status: 'pending', // hoặc trạng thái bạn muốn
    });

    // Cập nhật đơn hàng cũ về status "merged" (hoặc có thể xóa luôn)
    await Order.updateMany(
      { _id: { $in: orders.map(order => order._id) } },
      { $set: { status: 'merged' } }
    );

    return res.status(201).json({ message: 'Gộp đơn hàng thành công', newOrder });
  } catch (error) {
    console.error('Error merging orders:', error);
    res.status(500).json({ message: 'Lỗi khi gộp đơn hàng', error });
  }
};

