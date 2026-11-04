import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isVideo = file.mimetype.startsWith("video/");
    const isPdf = file.mimetype === "application/pdf";

    let resourceType = "image";
    if (isVideo) resourceType = "video";
    else if (isPdf) resourceType = "raw";

    return {
      folder: "learnflow/courses",
      resource_type: resourceType,
      format: isPdf ? "pdf" : (isVideo ? "mp4" : undefined), // 👈 Forces .pdf extension
    };
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image/") || 
    file.mimetype.startsWith("video/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only image, video, and PDF files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 200 * 1024 * 1024 },
});