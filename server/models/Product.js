const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, auto: true }, // Auto-generated ObjectId
    productName: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    availability: { type: Boolean, default: true },
    stock: { type: Number, required: true, min: 0 },
    imgURL: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
