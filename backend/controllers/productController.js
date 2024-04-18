const Product = require("../models/productModel");
const mongoose = require("mongoose");
const generateBlurHash = require("../utils/generateBlurHash");

//Get products
const getProducts = async (req, res) => {
  try {
    const productsWithCategory = await Product.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $sort: { createdAt: -1 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          price: 1,
          description: 1,
          colors: 1,
          phoneModels: 1,
          images: 1,
          category: "$categoryInfo",
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    for (const product of productsWithCategory) {
      const imageBlurHashes = [];
      for (const image of product.images) {
        const blurHash = await generateBlurHash(image.filepath);
        imageBlurHashes.push(blurHash);
      }
      product.blurHashes = imageBlurHashes;
    }

    res.status(200).json(productsWithCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single product

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
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
    const images = req.files.map((file) => ({
      filename: file.filename,
      filepath: file.path,
    }));
    const product = await Product.create({
      title,
      price,
      description,
      category,
      colors,
      phoneModels,
      images,
    });
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

const updateProduct = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such product with that id" });
  }

  const product = await Product.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!product) {
    return res.status(400).json({ error: "no such product" });
  }
  res.status(200).json(product);
};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
