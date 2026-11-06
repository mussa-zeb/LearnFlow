import express from "express";
import {
  getCategories,
  getPopularCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protectAdmin } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.get("/popular", getPopularCategories);

router.route("/").get(getCategories).post(protectAdmin, createCategory);

router
  .route("/:id")
  .get(getCategoryById)
  .put(protectAdmin, updateCategory)
  .delete(protectAdmin, deleteCategory);

export default router;