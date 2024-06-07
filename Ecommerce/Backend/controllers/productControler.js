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

    const product = new Product({ ...req.fields });
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

const fetchProductById = asynHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const fetchAllProducts = asynHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .limit(12)
      .sort({ createdAt: -1 }); //

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const addProductReview = asynHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
      console.log(req.user);
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;
      console.log(product);
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopRatedProducts = asynHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const fetchNewProducts = asynHandler(async (req, res) => {
  try {
    const products = await Product.find({}).sort({ _id: -1 }).limit(4);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const filterProducts = asynHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] }; // $gte: greater than or equal to, $lte: less than or equal to
    }
    const products = await Product.find(args);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopRatedProducts,
  fetchNewProducts,
  filterProducts,
};
