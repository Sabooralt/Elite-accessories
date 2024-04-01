// Example cart schema with support for multiple colors per product

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  color: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define a unique compound index for userId, productId, and color combination
cartSchema.index({ userId: 1, productId: 1, color: 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
