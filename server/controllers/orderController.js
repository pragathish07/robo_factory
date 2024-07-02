const Order = require('../models/Orders');
const Cart = require('../models/Cart');
const User = require('../models/User');

exports.placeOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }
    const totalAmount = cart.items.reduce((total, item) => total + item.product.basePrice * item.quantity, 0);
    const order = new Order({
      user: userId,
      items: cart.items,
      totalAmount,
    });
    await order.save();
    cart.items = [];
    await cart.save();
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
exports.cancelOrder =  async (req, res) => {
  const { orderId } = req.params;

  try {
    // Delete order from Order collection
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Remove order reference from User collection
    const updatedUser = await User.findByIdAndUpdate(
      deletedOrder.user,
      { $pull: { orders: orderId } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, message: 'Order cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};



exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



