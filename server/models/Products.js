const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    features: String,
    basePrice: Number,
    stock: Number,
    discount: String,
    discountType: String,
    category: String,
    subCategory: String,
    images: [String],
  });

   module.exports = mongoose.model('Product', productSchema);