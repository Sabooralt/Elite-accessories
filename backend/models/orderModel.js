const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId : {
        type: "String",
        unique: true,
        required: true
    },
    orderType: {
        type: String,
        enum: ['cart','singleProduct'],
        required: true
    },
    userId : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    orderDate : {
        type:  Date,
        default: Date.now
    },
    cartItems: [{
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: {
          type: Number,
          required: true
        },
        color:{
          type: String,
          default: 'Default'
        },
       
      }],
    
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product' 
      },
      quantity: {
        type: Number,
      },
      color:{
type: String,
      },

      status: {
        type: String,
        default: 'Pending'
      }

},{timestamps: true})
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;