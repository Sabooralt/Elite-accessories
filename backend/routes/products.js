const express = require("express");

const Product = require("../models/productModel");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const router = express.Router();

router.get("/", getProducts);

// GET a single product
router.get("/:id", getProduct);

//post
router.post("/", createProduct);
//DELETE
router.delete("/:id", deleteProduct);
//Update a product
router.patch("/:id", updateProduct);
//post

module.exports = router;
