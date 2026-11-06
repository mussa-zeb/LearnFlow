import Roadmap from "../models/Roadmap.js";

export const getRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ isPublished: true })
      .populate("categories")
      .sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({})
      .populate("categories")
      .sort({ createdAt: -1 });
    res.json(roadmaps);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoadmapById = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id).populate("categories");
    if (roadmap) {
      res.json(roadmap);
    } else {
      res.status(404).json({ message: "Roadmap not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createRoadmap = async (req, res) => {
  try {
    const {
      title,
      description,
      steps,
      categories,
      courseId,
      contentType,
      pdfUrl,
      isPublished,
    } = req.body;
    const roadmap = new Roadmap({
      title,
      description,
      steps: steps || [],
      categories: Array.isArray(categories) ? categories : [],
      courseId: courseId || null,
      contentType: contentType || "text",
      pdfUrl: pdfUrl || "",
      isPublished,
    });
    const created = await roadmap.save();
    const populated = await Roadmap.findById(created._id).populate("categories");
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: "Invalid roadmap data", error: error.message });
  }
};

export const updateRoadmap = async (req, res) => {
  try {
    const {
      title,
      description,
      steps,
      categories,
      courseId,
      contentType,
      pdfUrl,
      isPublished,
    } = req.body;
    const roadmap = await Roadmap.findById(req.params.id);

    if (roadmap) {
      roadmap.title = title || roadmap.title;
      roadmap.description = description || roadmap.description;
      roadmap.steps = steps !== undefined ? steps : roadmap.steps;
      if (categories !== undefined) {
        roadmap.categories = Array.isArray(categories) ? categories : [];
      }
      roadmap.courseId =
        courseId !== undefined ? courseId || null : roadmap.courseId;
      roadmap.contentType = contentType || roadmap.contentType;
      roadmap.pdfUrl = pdfUrl !== undefined ? pdfUrl : roadmap.pdfUrl;
      roadmap.isPublished =
        isPublished !== undefined ? isPublished : roadmap.isPublished;

      await roadmap.save();
      const populated = await Roadmap.findById(roadmap._id).populate("categories");
      res.json(populated);
    } else {
      res.status(404).json({ message: "Roadmap not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid roadmap data", error: error.message });
  }
};

export const deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);
    if (roadmap) {
      await Roadmap.deleteOne({ _id: roadmap._id });
      res.json({ message: "Roadmap removed successfully" });
    } else {
      res.status(404).json({ message: "Roadmap not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};