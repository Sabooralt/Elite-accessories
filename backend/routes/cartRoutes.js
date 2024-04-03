const express = require("express");

const {getCart,addItemToCart,removeItemFromCart,updateCartItemQuantity,clearCart} = require('../controllers/cartController');


const router = express.Router();

router.get('/:userId',getCart)

router.post('/add',addItemToCart);

router.delete('/remove/:id', removeItemFromCart);

router.delete('/clearCart/:userId',clearCart)

router.put('/update-quantity/:userId/:productId/:color',updateCartItemQuantity);

module.exports = router