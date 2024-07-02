// models/Product.js
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now }
});

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  features: String,
  basePrice: Number,
  stock: Number,
  discount: String,
  discountType: String,
  category: {type:String},
  subCategory: String,
  images: [String],
  reviews: [reviewSchema]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
