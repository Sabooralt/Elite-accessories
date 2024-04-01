const express = require("express");

const {addItemToCart,removeItemFromCart,updateCartItemQuantity} = require('../controllers/cartController');


const router = express.Router();

router.post('/add',addItemToCart);

router.delete('/remove/:userId/:productId/:color', removeItemFromCart)

router.put('/update-quantity/:userId/:productId/:color',updateCartItemQuantity);