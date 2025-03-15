const mongoose = require("mongoose");

const OrderProductSchema = new mongoose.Schema({
  customerID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { 
    type: String, 
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"], 
    default: "Pending" 
  },
  orderDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("OrderProduct", OrderProductSchema);