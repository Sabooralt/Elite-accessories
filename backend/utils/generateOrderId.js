const Order = require('../models/orderModel');

const generateOrderId = async() => {
  const prefix = 'ODR';
  let orderId;
  let isUnique = false;

  while(!isUnique){
    
    const randomDigits = Math.floor(Math.random()* 1000000);
    orderId = `${prefix}${randomDigits}`

    const existingOrder = await Order.findOne({orderId})
    if(!existingOrder){
        isUnique = true;
    }
  }

  return orderId
};
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Possible characters for random letters
    let randomString = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    return randomString;
  }
module.exports = generateOrderId;
