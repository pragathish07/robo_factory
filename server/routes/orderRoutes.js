const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authenticate');
const orderController = require('../controllers/orderController');
const purchaseController = require('../controllers/purchaseController')


router.post('/place', orderController.placeOrder);
router.get('/orders' , orderController.getOrders);
router.post('/buy', purchaseController.buyProduct);
router.delete('/orders/:orderId', orderController.cancelOrder);

module.exports = router;
