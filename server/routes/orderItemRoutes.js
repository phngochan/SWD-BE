const express = require("express");
const { getOrderItems, addOrderItem, updateOrderItemQuantity, deleteOrderItem } = require("../controllers/orderItemController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:orderID", authenticate, getOrderItems);
router.post("/", authenticate, authorize(["Customer"]), addOrderItem);
router.put("/:id", authenticate, authorize(["Customer"]), updateOrderItemQuantity);
router.delete("/:id", authenticate, authorize(["Customer"]), deleteOrderItem);

module.exports = router;
