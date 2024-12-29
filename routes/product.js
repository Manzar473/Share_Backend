const express = require('express');
const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require('../controllers/productController');
const authenticateToken = require("../middleware/authMiddleware");
const upload = require("../multer");

const router = express.Router();

// Create a product
router.post('/',authenticateToken,upload.single("image"), createProduct);

// Get all products
router.get('/',authenticateToken, getAllProducts);

// Get a product by ID
router.get('/:id',authenticateToken, getProductById);

// Update a product by ID
router.put('/:id',authenticateToken, updateProduct);

// Delete a product by ID
router.delete('/:id',authenticateToken, deleteProduct);

module.exports = router;
