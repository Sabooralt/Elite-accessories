// Example cart schema with support for multiple colors per product

const mongoose = require('mongoose');
const Product = require('../models/productModel')

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
  phoneModel : {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  subtotal: {
    type: Number, // Store subtotal as a field in the database
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define pre-save middleware to update subtotal before saving
cartSchema.pre('save', async function(next) {
  try {
    // Ensure that the product field is populated
    if (!this.product) {
      // Populate the product field based on the productId
      this.product = await Product.findById(this.productId);
    }

    // Calculate subtotal based on price and quantity
    if (this.product) {
      this.subtotal = this.product.price * this.quantity;
    } else {
      // Handle case where product is not found or null
      throw new Error('Product not found');
    }

    next();
  } catch (error) {
    next(error);
  }
});

cartSchema.index({ userId: 1, productId: 1, color: 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
