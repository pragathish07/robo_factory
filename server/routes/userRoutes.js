// routes/users.js
const express = require('express');
const router = express.Router();
const userController  = require('../controllers/userController');
const userMiddleware = require('../middleware/user');


router.get('/users/:userId/purchases', userController.getUserPurchases);
router.get('/users/current-user' ,userController.getCurrentUser);
router.get('/users/:id', userController.getCustomerDetails);

module.exports = router;


