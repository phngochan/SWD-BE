const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus,
  getBookingsByConsultantAndDate,
  getConsultantBookings,
  getCustomerBookings,
  cancelBookingRequest,
  updateBookingRequest,
  confirmBooking,
  completeBooking,
  cancelBooking,
  getBookingById,
  updateBookingStatus
} = require('../controllers/bookingRequestController');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/status', updateBookingRequestStatus);
router.get('/booked-times', getBookingsByConsultantAndDate);
router.get("/my-bookings", authenticate, authorize(["Consultant"]), getConsultantBookings);
router.get("/history-bookings", authenticate, authorize(["Customer"]), getCustomerBookings);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelBookingRequest);
router.put("/:id", authenticate, authorize(["Staff"]), updateBookingRequest);
router.put("/:id/confirm", authenticate, authorize(["Staff"]), confirmBooking);
router.put("/:id/complete", authenticate, authorize(["Staff"]), completeBooking);
router.put("/:id/cancel", authenticate, authorize(["Customer", "Staff"]), cancelBooking);
router.get("/:id", authenticate, getBookingById);
router.post('/update-status', authenticate, authorize(['Staff, Customer']), updateBookingStatus);
router.put('/:bookingId/assign', authenticate, authorize(['Staff']), assignConsultant)




module.exports = router;
