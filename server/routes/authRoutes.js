const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize } = require("../middlewares/authMiddleware");

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/verify', authController.verifyEmail);

router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/resend-verification-email', authController.resendVerificationEmail);
router.post('/logout', authController.logout);
router.post('/change-password', authenticate, authorize(['Manager', 'Consultant', 'Staff']), authController.changePassword);

module.exports = router;