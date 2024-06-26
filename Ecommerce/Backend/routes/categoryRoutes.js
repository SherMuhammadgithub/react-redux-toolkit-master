import express from "express";
import { authenticate, authorizeAdmin } from "../middleware/authMiddleware.js";
import {
  createCategory,
  listCategories,
  readCategory,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, createCategory);
router.route("/:categoryId").put(authenticate, authorizeAdmin, updateCategory);

router
  .route("/:categoryId")
  .delete(authenticate, authorizeAdmin, removeCategory);

router.route("/categories").get(listCategories);
router.route("/:categoryId").get(authenticate, authorizeAdmin, readCategory);

export default router;
