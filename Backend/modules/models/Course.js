import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Course category is required"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Course duration is required"],
      trim: true,
    },
    durationMinutes: {
      type: Number,
      required: [true, "Duration in minutes is required"],
      min: 1,
    },
    thumbnail: {
      type: String,
      trim: true,
      default: "",
    },
    previewVideoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    // 🔥 NEW: Array of lessons
    lessons: [
      {
        title: { type: String, required: true },
        videoUrl: { type: String, required: true },
      },
    ],
    // Keep videoUrl for backwards compatibility
    videoUrl: {
      type: String,
      trim: true,
      default: "",
    },
    content: {
      type: String,
      required: [true, "Course content is required"],
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;