const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getCustomerOrders,
  cancelOrder,
  getOrderById,
} = require("../controllers/OrderProductController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, authorize(["Customer"]), createOrder);
router.get("/", authenticate, authorize(["Staff"]), getAllOrders);
router.put("/:id/status", authenticate, authorize(["Staff"]), updateOrderStatus);
router.get("/my-orders", authenticate, authorize(["Customer"]), getCustomerOrders);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelOrder);
router.get("/:id", authenticate, getOrderById);

module.exports = router;
