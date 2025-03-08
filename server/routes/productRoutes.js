const express = require('express');
const { 
    createProduct, 
    getAllProducts, 
    getProductById, 
    updateProduct, 
    deleteProduct 
} = require('../controllers/productController');
const router = express.Router();

router.post('/', createProduct); // Create a new product
router.get('/', getAllProducts); // Get all products
router.get('/:id', getProductById); // Get product by ID
router.put('/:id', updateProduct); // Update product by ID
router.delete('/:id', deleteProduct); // Delete product by ID

module.exports = router;
