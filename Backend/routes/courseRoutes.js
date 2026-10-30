import express from "express";
import {
  getCourses,
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getCourses).post(protectAdmin, createCourse);
router.route("/all").get(protectAdmin, getAllCourses);
router
  .route("/:id")
  .get(getCourseById)
  .put(protectAdmin, updateCourse)
  .delete(protectAdmin, deleteCourse);

export default router;