const Purchase = require('../models/Purchase');
const Product = require('../models/Products');
const Order = require('../models/Orders');
const User = require('../models/User');



exports.buyProduct = async (req, res) => {
  try {
    const { productId, quantity, userId, address } = req.body;

    // Check if the product exists and has enough stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: 'Insufficient stock' });
    }

    // Deduct stock
    product.stock -= quantity;
    await product.save();

    // Calculate total amount
    const totalAmount = product.basePrice * quantity;

    // Create order
    const order = new Order({
      user: userId,
      items: [{ product: productId, quantity }],
      totalAmount,
      address,
      status: 'Pending',
      paid: 'Yes',
      tracking: 'Pending',
    });
    await order.save();

    // Update user's orders
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({ message: 'Purchase successful', order });
  } catch (error) {
    console.error('Error during purchase:', error);
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};




