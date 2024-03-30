const express = require("express");

const {createCategory,getCategories,deleteCategory} = require('../controllers/categoryController')

 const router = express.Router();

 router.post('/',createCategory);


router.delete("/:id", deleteCategory);

 router.get('/', getCategories)

 module.exports = router;