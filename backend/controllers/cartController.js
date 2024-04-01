// cartController.js

const Cart = require('../models/cartModel');

// Controller method to add item to cart
const addItemToCart = async (req, res) => {
  const { userId, productId, quantity, color } = req.body;

  try {
    // Check if item already exists in the cart
    let cartItem = await Cart.findOne({ userId, productId, color });

    if (cartItem) {
      // If item exists, update quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // If item does not exist, create new cart item
      cartItem = new Cart({ userId, productId, quantity, color });
      await cartItem.save();
    }

    res.status(200).json({ success: true, message: 'Item added to cart successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller method to remove item from cart
const removeItemFromCart = async (req, res) => {
  const { userId, productId, color } = req.params;

  try {
    await Cart.findOneAndDelete({ userId, productId, color });

    res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Controller method to update quantity of item in cart
const updateCartItemQuantity = async (req, res) => {
  const { userId, productId, color } = req.params;
  const { quantity } = req.body;

  try {
    // Find cart item by userId, productId, and color
    let cartItem = await Cart.findOne({ userId, productId, color });

    if (!cartItem) {
      return res.status(404).json({ success: false, error: 'Cart item not found' });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({ success: true, message: 'Cart item quantity updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
};
