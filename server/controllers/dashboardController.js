// routes/dashboard.js
const express = require('express');

const Order = require('../models/Orders');
const Product = require('../models/Products');
const User = require('../models/User');

// Fetch recent sold items

    
exports.recentSold = async (req, res) => {
  try {
    const recentSoldOrders = await Order.find()
      .populate('items.product')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(recentSoldOrders);
  } catch (error) {
    console.error('Error fetching recent sold data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

    
exports.dashboardStats =  async (req, res) => {
  try {
    const totalEarnings = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } },
    ]);
    const totalOrders = await Order.countDocuments();
    const newOrders = await Order.countDocuments({ status: 'New' });
    const allProducts = await Product.countDocuments();
    const totalCustomers =  await User.countDocuments({ orders: { $exists: true, $not: { $size: 0 } } });
    const visitorCount = 160; // Assuming static for now

    res.json({
      totalEarnings: totalEarnings[0]?.total || 0,
      totalOrders,
      newOrders,
      allProducts,
      totalCustomers,
      visitorCount,
    });
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


 
    
exports.monthlyStats = async (req, res) => {
  try {
    // Aggregate daily revenue and customer count
    const revenueStats = await Order.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          totalRevenue: { $sum: "$totalAmount" },
          newCustomers: { $sum: { $cond: [{ $ne: ["$user", null] }, 1, 0] } }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    
  


    // Aggregate monthly new customers (only consider users who made purchases)
    const customerStats = await User.aggregate([
      {
        $group: {
          _id: {
            day: { $dayOfMonth: "$createdAt" },
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" }
          },
          newCustomers: { $addToSet: "$_id" }
        }
      },
      {
        $project: {
          _id: 1,
          newCustomers: { $size: "$newCustomers" }
        }
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } }
    ]);

    res.json({ revenueStats, customerStats });
  } catch (error) {
    console.error('Error fetching monthly stats:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



