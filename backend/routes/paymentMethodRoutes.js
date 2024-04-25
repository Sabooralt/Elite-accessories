const express = require("express");

const {createPaymentMethod,getPaymentMethod,getSinglePaymentMethod,deletePaymentMethod} = require('../controllers/paymentMethodController');

const router = express.Router();

router.get('/',getPaymentMethod);

router.get('/:id',getSinglePaymentMethod)

router.post('/add',createPaymentMethod);

router.delete('/remove/:id', deletePaymentMethod);

module.exports = router