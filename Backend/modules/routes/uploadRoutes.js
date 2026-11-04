import express from "express";
import { upload } from "../../shared/middleware/uploadMiddleware.js";
import { protectAdmin } from "../../shared/middleware/authMiddleware.js";

const router = express.Router();

const respond = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  // req.file.path is the secure Cloudinary URL
  res.json({ url: req.file.path });
};


router.post("/image", protectAdmin, upload.single("file"), respond);
router.post("/video", protectAdmin, upload.single("file"), respond);
router.post("/document", protectAdmin, upload.single("file"), respond); // Added for clarity

export default router;