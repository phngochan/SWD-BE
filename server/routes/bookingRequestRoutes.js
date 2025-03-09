const express = require('express');
const {
  createBookingRequest,
  getAllBookingRequests,
  assignConsultant,
  updateBookingRequestStatus,
  getBookingsByConsultantAndDate
} = require('../controllers/bookingRequestController');

const router = express.Router();

router.post('/', createBookingRequest);
router.get('/', getAllBookingRequests);
router.put('/:id/assign-consultant', assignConsultant); // Updated therapist → consultant
router.put('/:id/status', updateBookingRequestStatus);
router.get('/booked-times', getBookingsByConsultantAndDate);
router.get("/history-bookings",authenticate, authorize(["Customer"]),getCustomerBookings);
router.put("/:id/cancel", authenticate, authorize(["Customer"]), cancelBookingRequest);

module.exports = router;
