const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderCode: { type: String, unique: true, required: true, default: () => `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}` }, // Mã đơn hàng tự động
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled", "Completed"], default: "Pending" },
  orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItem" }], // Danh sách sản phẩm
  totalPrice: { type: Number, required: true, default: 0 }, // Tổng tiền đơn hàng
  paymentMethod: { type: String, enum: ["Cash", "Credit Card", "PayPal", "PayOS"], default: "Cash" }, // Phương thức thanh toán
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("OrderProduct", OrderProductSchema);
