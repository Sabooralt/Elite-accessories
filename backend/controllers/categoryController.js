const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getCategories = async (req, res) => {
  const Categories = await Category.find({}).sort({ createdAt: -1 });

  res.status(201).json(Categories);
};

const deleteCategory = async (req,res)=>{
    const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid) {
    return res.status(404).json({ error: "no such category with that id" });
  }
  const category = await Category.findOneAndDelete({ _id: id });
  if (!category) {
    return res.status(400).json({ error: "no such product" });
  }
  res.status(200).json(category);
}
module.exports = { createCategory, getCategories, deleteCategory };
