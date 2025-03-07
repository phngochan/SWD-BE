const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all staff members (Manager only)
router.get('/', authenticate, authorize(['Manager']), staffController.getAllStaff);

// Get staff member by ID
router.get('/:id', authenticate, authorize(['Manager', 'Staff']), staffController.getStaffById);

// Update staff member (Manager only)
router.put('/:id', authenticate, authorize(['Manager']), staffController.updateStaff);

// Delete staff member (Manager only)
router.delete('/:id', authenticate, authorize(['Manager']), staffController.deleteStaff);

// Creat staff member (Manager only)
router.post('/', authenticate, authorize(['Manager']), staffController.createStaff);

router.post("/:id/reset-password", authenticate, authorize(['Manager']),staffController.resetPassword);

module.exports = router;
