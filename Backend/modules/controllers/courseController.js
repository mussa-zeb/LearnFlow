import Course from "../models/Course.js";


export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({}).sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const createCourse = async (req, res) => {
  try {
    const {
      title, description, category, duration, durationMinutes,
      thumbnail, previewVideoUrl, videoUrl, lessons, content, isPublished,
    } = req.body;

    const course = new Course({
      title,
      description,
      category,
      duration,
      durationMinutes: Number(durationMinutes),
      thumbnail: thumbnail || "",
      previewVideoUrl: previewVideoUrl || "",
      videoUrl: videoUrl || "",
      lessons: lessons || [], 
      content,
      isPublished,
    });

    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).json({ message: "Invalid course data", error: error.message });
  }
};


export const updateCourse = async (req, res) => {
  try {
    const {
      title, description, category, duration, durationMinutes,
      thumbnail, previewVideoUrl, videoUrl, lessons, content, isPublished,
    } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
      course.title = title || course.title;
      course.description = description || course.description;
      course.category = category || course.category;
      course.duration = duration || course.duration;
      course.durationMinutes = Number(durationMinutes) || course.durationMinutes;
      course.thumbnail = thumbnail !== undefined ? thumbnail : course.thumbnail;
      course.previewVideoUrl = previewVideoUrl !== undefined ? previewVideoUrl : course.previewVideoUrl;
      course.videoUrl = videoUrl !== undefined ? videoUrl : course.videoUrl;
      course.lessons = lessons !== undefined ? lessons : course.lessons; // 🔥 Handle lessons
      course.content = content || course.content;
      course.isPublished = isPublished !== undefined ? isPublished : course.isPublished;

      const updatedCourse = await course.save();
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid course data", error: error.message });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      await Course.deleteOne({ _id: course._id });
      res.json({ message: "Course removed successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};