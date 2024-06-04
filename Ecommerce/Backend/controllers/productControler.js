import asynHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

const addProduct = asynHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !description:
        return res.status(400).json({ message: "Description is required" });
      case !price:
        return res.status(400).json({ message: "Price is required" });
      case !category:
        return res.status(400).json({ message: "Category is required" });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required" });
      case !brand:
        return res.status(400).json({ message: "Brand is required" });
    }

    const product = new Product({ ...res.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const updateProductDetails = asynHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ message: "Name is required" });
      case !description:
        return res.status(400).json({ message: "Description is required" });
      case !price:
        return res.status(400).json({ message: "Price is required" });
      case !category:
        return res.status(400).json({ message: "Category is required" });
      case !quantity:
        return res.status(400).json({ message: "Quantity is required" });
      case !brand:
        return res.status(400).json({ message: "Brand is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const removeProduct = asynHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const fetchProducts = asynHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.status(200).json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: count > pageSize,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});
