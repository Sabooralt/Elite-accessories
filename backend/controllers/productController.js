
const Product = require("../models/productModel");
const mongoose = require("mongoose");

//Get products

const getProducts = async (req, res) => {
  const Products = await Product.find({}).sort({ createdAt: -1 });

  res.status(200).json(Products);
};

// Get a single product

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such product with that id" });
  }

  const product = await Product.findById(id);
  if (!product) {
    return res.status(400).json({ error: "no such product" });
  }
  res.status(200).json(product);
};
// Create a product

const createProduct = async (req, res) => {
  const { title, price, description, category, colors, phoneModels } = req.body;

  try {
      const images = req.files.map(file => ({
          filename: file.filename,
          filepath: file.path
      }));
      
      // Save the product data and image details to the database
      const product = await Product.create({ title, price, description, category, colors, phoneModels, images });
      res.status(200).json(product);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such product with that id" });
  }
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return res.status(400).json({ error: "no such product" });
  }
  res.status(200).json(product);
};

//update product

const updateProduct = async (req,res)=>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid) {
        return res.status(404).json({ error: "no such product with that id" });
      }

      const product =await Product.findOneAndUpdate({_id: id},{
        ...req.body
      })
      if (!product) {
        return res.status(400).json({ error: "no such product" });
      }
      res.status(200).json(product)
}

module.exports = { createProduct, getProducts, getProduct, deleteProduct,updateProduct };
