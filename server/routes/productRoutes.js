const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Create a new product
router.post('/products', productController.createProduct);

// Get a product by ID
router.get('/products/:id', productController.getProductById);

// Get products by category
router.get('/products/category/:id', productController.getProductsByCategory);

// Update a product by ID
router.put('/products/:id', productController.updateProductById);

// Delete a product by ID
router.delete('/products/:id', productController.deleteProductById);

router.get('/products', productController.getAllProducts);
router.get('/categories', productController.getCategory);
router.get('/random', productController.getRandomProducts);



// Get product with reviews
router.get('/products/:id', productController.getProductWithReviews);
router.post('/products/:id/reviews', productController.addReview);
router.get('/products/:userId/purchases', productController.getUserPurchases);


module.exports = router;
