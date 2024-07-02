const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const cartController = require('../controllers/cartController');

router.post('/cart/:id', cartController.addToCart);
router.get('/cart/:id', cartController.getCart);
router.delete('/cart/:id', cartController.removeFromCart);
router.put('/cart/:id', cartController.updateCartItem);

router.post('/checkout',cartController.checkoutCart)

module.exports = router;
