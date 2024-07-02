const User = require('../models/User');
const Order = require('../models/Orders');
const jwt = require('jsonwebtoken');

exports.getUserPurchases = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate('products.product');
    const purchasedProducts = orders.flatMap(order => order.products.map(p => p.product));
    res.status(200).json({ purchasedProducts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getCurrentUser = (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  jwt.verify(token, 'secret', async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    try {
      const user = await User.findById(decoded.id); 
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong");
    }
  }
)
};

exports.getCustomerDetails = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await User.findById(req.params.id).select('-password');
    const orders = await Order.find({ user: customerId }).populate('items.product');

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json({ customer, orders });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer details', error });
  }
};
