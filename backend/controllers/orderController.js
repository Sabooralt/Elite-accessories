const Order = require('../models/orderModel');
const mongoose = require('mongoose');
const generateOrderId = require('../utils/generateOrderId');

const createOrder = async (req,res)=>{
    try{
        const orderData = req.body;
        const user = orderData.userId;
        const orderId =  await generateOrderId();
        orderData.orderId = orderId;

        if(!user){
            return res.json({message : 'User not found please try again!'})
        }
        const order = await Order.create(orderData)
        res.status(201).json(order)
    }catch(error){
        console.log('Error creating order:', error)
        res.status(500).json({success: false,error: error})
    }
}
const getOrders = async (req,res)=>{

}
module.exports = {createOrder};