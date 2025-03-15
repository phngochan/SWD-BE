const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true }
  }],
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

module.exports = mongoose.model("OrderProduct", OrderProductSchema);
