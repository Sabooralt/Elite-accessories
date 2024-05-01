const Payment = require("../models/paymentMethods");
const mongoose = require("mongoose");

const createPaymentMethod = async (req, res) => {
  const { method,disabled } = req.body;

  try {
    const payment = await Payment.create({ method,disabled });
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getPaymentMethod = async (req, res) => {
  const payment = await Payment.find({}).sort({ createdAt: -1 });

  res.status(201).json(payment);
};
const getSinglePaymentMethod = async(req,res) =>{

  try{

    const {id} = req.params;
    const payment = await Payment.findById({_id: id})

    if(!payment){
      res.status(404).json({message: 'Payment method not found'})
    }
  
    res.status(201).json(payment)
  }catch(error){
   res.status(400).json({message: error})
  }
}
const deletePaymentMethod = async (req,res)=>{
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such category with that id" });
  }
  const payment = await Payment.findOneAndDelete({ _id: id });
  if (!payment) {
    return res.status(400).json({ error: "no such product" });
  }
  res.status(200).json(payment);
}
module.exports = { createPaymentMethod, getPaymentMethod, getSinglePaymentMethod, deletePaymentMethod };
