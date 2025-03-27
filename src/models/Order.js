const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    items: [
        {
            productID: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
        default: "Pending",
    },
    paymentMethod: { 
        type: String, 
        enum: ["Cash", "Credit Card", "PayPal", "PayOS"], 
        default: "Cash" 
    }, // Phương thức thanh toán
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

OrderSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Order", OrderSchema);