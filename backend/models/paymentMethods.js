// Example cart schema with support for multiple colors per product

const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    method: {
      type: String,
      required: true,
    },
    disabled: {
        type: Boolean,
        default: true,
    },
  },
  { timestamps: true }
);

// Define a unique compound index for userId, productId, and color combination

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
