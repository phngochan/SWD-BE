const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getCustomerOrders,
  cancelOrder
} = require("../controllers/OrderProductController");
const router = express.Router();

router.post("/", authenticate, authorize(["Customer"]), createOrder);
router.get("/", authenticate, authorize(["Admin", "Staff"]), getAllOrders);
router.put("/:id/status", authenticate, authorize(["Admin", "Staff"]), updateOrderStatus);
router.get("/my-orders", authenticate, authorize(["Customer"]), getCustomerOrders);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelOrder);

module.exports = router;
