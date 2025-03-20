const express = require('express');
const { 
    createFeedback,
    getFeedbackByBooking,
    getAverageServiceRating, 
    getAverageConsultantRating  
} = require('../controllers/feedbackController');
const { authenticate } = require('../middlewares/authMiddleware'); // Require authentication

const router = express.Router();

router.get('/service-rating', authenticate, getAverageServiceRating); // Lấy rating trung bình của dịch vụ
router.get('/consultant-rating', authenticate, getAverageConsultantRating); // Lấy rating trung bình của tư vấn viên
router.post('/', authenticate, createFeedback); // Require authentication to create feedback
router.get('/:bookingRequestId', authenticate, getFeedbackByBooking); // Secure route

module.exports = router;