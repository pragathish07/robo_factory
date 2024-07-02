const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Products');
const Order = require('../models/Orders')
const User = require('../models/User')

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    } else {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.id }).populate({
      path: 'items.product',
      model: 'Product' // Correctly reference the Product model
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
    } else {
      return res.status(404).json({ success: false, message: 'Item not found in cart' });
    }

    await cart.save();
    res.json({ success: true, cart });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.checkoutCart =  async (req, res) => {
  try {
    const { userId, items, address } = req.body;

    // Validate input
    if (!userId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    // Validate each item in the cart
    for (const item of items) {
      const { quantity } = item;
      const productId = item.product._id
      

      // Check if product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }

      // Check if sufficient stock is available
      if (product.stock < quantity) {
        return res.status(400).json({ message: `Insufficient stock for product ${product.name}` });
      }
    }

    // Calculate total amount and create order
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const { quantity } = item;
      const productId = item.product._id
      const product = await Product.findById(productId);
      const itemTotal = product.basePrice * quantity;
      totalAmount += itemTotal;
      orderItems.push({ product: productId, quantity });
      
      // Deduct stock
      product.stock -= quantity;
      await product.save();
    }

    // Create order
    const order = new Order({
      user: userId,
      items: orderItems,
      totalAmount,
      address,
      status: 'Pending',
      paid: true,
      tracking: 'Pending',
    });

    await order.save();

    // Update user's orders
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}