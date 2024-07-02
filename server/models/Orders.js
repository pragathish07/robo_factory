const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending',
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paid: { type: String, required: true ,default:'yes'},
  address: { type: String, required: true },
  
  tracking: { type: String, required: true,default: 'Pending'},
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
