const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  purchaseDate: { type: Date, default: Date.now },
  // other fields as needed
});

module.exports = mongoose.model('Purchase', purchaseSchema);
