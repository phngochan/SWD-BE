const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/authMiddleware"); 
const paymentController = require("../controllers/paymentController");


router.post("/receive-hook", paymentController.receivePayment); 
router.post("/create-payment/:bookingId", authenticate, paymentController.createEmbeddedPaymentLink); 
module.exports = router;