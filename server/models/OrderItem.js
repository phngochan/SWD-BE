const mongoose = require("mongoose");

const OrderItemSchema = new mongoose.Schema({
  orderID: { type: mongoose.Schema.Types.ObjectId, ref: "OrderProduct", required: true },
  productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 }
});

module.exports = mongoose.model("OrderItem", OrderItemSchema);
