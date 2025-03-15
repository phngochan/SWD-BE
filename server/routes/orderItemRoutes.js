const express = require("express");
const { getOrderItems, addOrderItem, deleteOrderItem } = require("../controllers/OrderItemController");
const { authenticate, authorize } = require("../middlewares/AuthMiddleware");

const router = express.Router();

router.get("/:orderID", authenticate, getOrderItems);
router.post("/", authenticate, authorize(["Customer"]), addOrderItem);
router.delete("/:id", authenticate, authorize(["Customer"]), deleteOrderItem);

module.exports = router;
