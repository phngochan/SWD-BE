const express = require("express");
const router = express.Router();
const managerController = require("../controllers/managerController");
const productController = require("../controllers/productController");
const { authenticate, authorize } = require('../middlewares/AuthMiddleware');


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
router.get('/products', authenticate, authorize(['Manager']), productController.getAllProducts);

// Get product by ID
router.get('/products/:id', authenticate, authorize(['Manager']), productController.getProductById);

// Create new product
router.post('/products', authenticate, authorize(['Manager']), productController.createProduct);

// Update product
router.put('/products/:id', authenticate, authorize(['Manager']), productController.updateProduct);

// Delete product
router.delete('/products/:id', authenticate, authorize(['Manager']), productController.deleteProduct);


module.exports = router;
