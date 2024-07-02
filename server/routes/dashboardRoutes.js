const express = require('express'); 
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');



router.get('/recent-sold', dashboardController.recentSold);
router.get('/dashboard-stats', dashboardController.dashboardStats);
router.get('/monthly-stats', dashboardController.monthlyStats);

module.exports = router