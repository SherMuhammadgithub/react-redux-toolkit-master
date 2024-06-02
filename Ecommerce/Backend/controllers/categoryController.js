import Category from "../models/categoryModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

const createCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Name is required" });
    }
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({ error: "Category already exists" });
    }
    const category = new Category({ name }).save();
    res.status(201).json({ name: category.name});
  } catch (error) {
    console.error(error);
    res.status(400).json(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category.name = name;
    await category.save();
    res.json({ name: category.name, _id: category._id });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
const removeCategory = asyncHandler(async (req, res) => {
  try {
    const removedCategory = await Category.findByIdAndDelete(
      req.params.categoryId
    );
    if (!removedCategory) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ name: removedCategory.name, _id: removedCategory._id });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
const listCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
const readCategory = asyncHandler(async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json({ name: category.name, _id: category._id });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
export {
  createCategory,
  updateCategory,
  removeCategory,
  listCategories,
  readCategory,
};
