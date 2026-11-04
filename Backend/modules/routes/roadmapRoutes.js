import express from "express";
import {
  getRoadmaps,
  getAllRoadmaps,
  getRoadmapById,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
} from "../controllers/roadmapController.js";
import { protectAdmin } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getRoadmaps).post(protectAdmin, createRoadmap);
router.route("/all").get(protectAdmin, getAllRoadmaps);
router
  .route("/:id")
  .get(getRoadmapById)
  .put(protectAdmin, updateRoadmap)
  .delete(protectAdmin, deleteRoadmap);

export default router;