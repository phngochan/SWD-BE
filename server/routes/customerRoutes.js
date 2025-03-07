const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');

// Get all customers (Manager only)
router.get('/', authenticate, authorize(['Manager']), customerController.getAllCustomers);

// Get customer by ID
router.get('/:id', authenticate, authorize(['Manager', 'Customer']), customerController.getCustomerById);

// Update customer profile
router.put('/:id', authenticate, authorize(['Customer']), customerController.updateCustomer);

// Delete customer (Manager only)
router.delete('/:id', authenticate, authorize(['Manager']), customerController.deleteCustomer);

// Change password
router.post('/change-password', authenticate, customerController.changePassword);

module.exports = router;