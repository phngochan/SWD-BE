const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const { authenticate, authorize } = require('../middlewares/authMiddleware');


// Get all users
router.get('/users', authenticate, authorize(['Manager']), managerController.getAllUsers);

// Get user by ID
router.get('/users/:id', authenticate, authorize(['Manager']), managerController.getUserById);

// Update user role
router.put('/users/:id/role', authenticate, authorize(['Manager']), managerController.updateUserRole);

// Delete user
router.delete('/users/:id', authenticate, authorize(['Manager']), managerController.deleteUser);

// Approve consultant
router.put('/consultants/:id/approve', authenticate, authorize(['Manager']), managerController.approveConsultant);

// Get all products
router.get('/products', authenticate, authorize(['Manager']), managerController.getAllProducts);

// Get product by ID
router.get('/products/:id', authenticate, authorize(['Manager']), managerController.getProductById);

// Create new product
router.post('/products', authenticate, authorize(['Manager']), managerController.createProduct);

// Update product
router.put('/products/:id', authenticate, authorize(['Manager']), managerController.updateProduct);

// Delete product
router.delete('/products/:id', authenticate, authorize(['Manager']), managerController.deleteProduct);

module.exports = router;
