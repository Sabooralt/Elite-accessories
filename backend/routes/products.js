const express = require("express");
const multer = require('multer')

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
      cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname); // Use the original filename
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
