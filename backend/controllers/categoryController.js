const Category = require("../models/categoryModel");
const mongoose = require("mongoose");

const createCategory = async (req,res)=>{
    const {name} = req.body;

    try{
        const category = await Category.create({name})
        res.status(201).json(category)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const getCategories = async (req,res)=>{
    const Categories = await Category.find({}).sort({createdAt: -1})

    res.status(201).json(Categories)
    
}
module.exports = {createCategory,getCategories};