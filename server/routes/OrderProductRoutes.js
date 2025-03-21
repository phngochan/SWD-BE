const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  getCustomerOrders,
  cancelOrder,
  getOrderById,
  getCartByCustomerId, // Import the new function
  mergeOrdersByCustomer,

} = require("../controllers/OrderProductController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authenticate, authorize(["Customer"]), createOrder);
router.get("/", authenticate, authorize(["Staff"]), getAllOrders);
router.put("/:id/status", authenticate, authorize(["Staff"]), updateOrderStatus);
router.get("/my-orders", authenticate, authorize(["Customer"]), getCustomerOrders);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelOrder);
router.get("/:id", authenticate, getOrderById);
router.get("/cart", authenticate, authorize(["Customer"]), getCartByCustomerId); // Add the new route
router.post('/orders/merge', orderController.mergeOrdersByCustomer);

module.exports = router;
