import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Expert"], default: "Beginner" },
  icon: { type: String, default: "Home" }, // Maps to Lucide icons on frontend
});

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    steps: [stepSchema],
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null }, // Optional assignment
    contentType: { type: String, enum: ["text", "pdf"], default: "text" },
    pdfUrl: { type: String, default: "" }, // Used if contentType is 'pdf'
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Roadmap = mongoose.model("Roadmap", roadmapSchema);
export default Roadmap;