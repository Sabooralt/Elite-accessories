const express = require("express");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../public/ProductImages/'); 
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}-${Date.now()}.jpg`;
      cb(null, uniqueFileName); // Use the original filename
  }
});

const upload = multer({ storage: storage });
router.post("/", upload.array("images"), createProduct);

//DELETE
router.delete("/:id", deleteProduct);


//Update a product
router.patch("/:id", updateProduct);
//post

module.exports = router;
