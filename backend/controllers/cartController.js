// cartController.js

const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const reviewModel = require("../models/reviewModel");
// Controller method to add item to cart

const getCart = async (req, res) => {
  const userId = req.params.userId;

  try {
    const cartItems = await Cart.find({ userId });

    if (cartItems.length === 0) {
      return null;
    }

    const productIds = cartItems.map((item) => item.productId);

    const products = await Product.find({ _id: { $in: productIds } });

    const cartWithProductDetails = cartItems.map((item) => {
      const product = products.find(
        (product) => product._id.toString() === item.productId.toString()
      );
      return { ...item._doc, product };
    });

    res.status(200).json(cartWithProductDetails);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart items" });
  }
};

const addItemToCart = async (req, res) => {
  const { userId, productId, quantity, color } = req.body;

  try {
    let cartItem = await Cart.findOne({ userId, productId, color });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new Cart({ userId, productId, quantity, color });
      await cartItem.save();
    }

    const product = await Product.findById(productId);

    // Combine cartItem and product into a single object
    const item = {
      ...cartItem._doc,
      product: product._doc
    };

    res.status(200).json(item); // Return the combined item object
  } catch (err) {
    console.error("Error adding item to cart:", err);
    res.status(500).json({ success: false, error: "Failed to add item to cart" });
  }
};





// Controller method to remove item from cart
const removeItemFromCart = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedItem = await Cart.findOneAndDelete({ _id: id });

    if (!deletedItem) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    res.status(200).json(deletedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedItem = await Cart.deleteMany({ userId: userId });

    if (deletedItem.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No Item Found In your cart",
      });
    }

    res.status(200).json(deletedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Internal server error" });
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
      return res
        .status(404)
        .json({ success: false, error: "Cart item not found" });
    }

    // Update quantity
    cartItem.quantity = quantity;
    await cartItem.save();

    res.status(200).json({
      success: true,
      message: "Cart item quantity updated successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getCart,
  addItemToCart,
  removeItemFromCart,
  updateCartItemQuantity,
  clearCart,
};
