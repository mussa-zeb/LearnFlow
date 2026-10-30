import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { coursesApi } from "../../utils/api";
import MediaInput from "../../components/MediaInput";
import { ArrowLeft, Save, Plus, Trash2, GripVertical, Video, CheckCircle } from "lucide-react";

const AdminCourseLessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();

  const [courseTitle, setCourseTitle] = useState("");
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id);
        setCourseTitle(data.title);
        // Use existing lessons, or initialize with one empty if none exist
        setLessons(data.lessons && data.lessons.length > 0 ? data.lessons : [{ title: "Class 1", videoUrl: "" }]);
      } catch (error) {
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleLessonChange = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const addLesson = () => {
    setLessons([...lessons, { title: `Class ${lessons.length + 1}`, videoUrl: "" }]);
  };

  const removeLesson = (index) => {
    if (lessons.length === 1) {
      return alert("A course must have at least one lesson.");
    }
    setLessons(lessons.filter((_, i) => i !== index));
  };

  const moveLesson = (index, direction) => {
    if (direction === "up" && index > 0) {
      const updated = [...lessons];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      setLessons(updated);
    } else if (direction === "down" && index < lessons.length - 1) {
      const updated = [...lessons];
      [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
      setLessons(updated);
    }
  };

  const handleSave = async () => {
    // Validate all lessons have a title and video
    const hasEmptyFields = lessons.some((l) => !l.title.trim() || !l.videoUrl);
    if (hasEmptyFields) {
      setError("Please ensure every lesson has a title and a video URL/upload.");
      return;
    }

    setError("");
    setSaving(true);
    setSuccessMsg("");

    try {
      await coursesApi.update(id, { lessons }, token);
      setSuccessMsg("Curriculum saved successfully!");
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setError("Failed to save curriculum. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-12 text-center text-neutral-500">Loading curriculum...</div>;
  }

  return (
    <>
      {/* Header */}
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Link
              to="/admin/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-150 mb-2"
            >
              <ArrowLeft className="h-4 w-4" /> Back to courses
            </Link>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
              Manage Curriculum
            </h1>
            <p className="text-neutral-600 mt-1">Adding videos to: <span className="font-medium text-neutral-900">{courseTitle}</span></p>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 disabled:opacity-50 self-start sm:self-auto"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save Curriculum"}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {error && (
            <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700 ring-1 ring-green-100 flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> {successMsg}
            </div>
          )}

          <div className="space-y-6">
            {lessons.map((lesson, index) => (
              <div key={index} className="relative rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm group">
                
                {/* Lesson Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-neutral-100">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600">
                      {index + 1}
                    </div>
                    <h3 className="text-base font-semibold text-neutral-900">Lesson {index + 1}</h3>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveLesson(index, "up")}
                      disabled={index === 0}
                      className="p-1.5 text-neutral-400 hover:text-neutral-900 disabled:opacity-30 rounded-md hover:bg-neutral-100"
                      title="Move Up"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeLesson(index)}
                      className="p-1.5 text-red-500 hover:text-red-700 rounded-md hover:bg-red-50 ml-2"
                      title="Delete Lesson"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Lesson Fields */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-neutral-900 mb-2">
                      Lesson Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lesson.title}
                      onChange={(e) => handleLessonChange(index, "title", e.target.value)}
                      className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
                      placeholder="e.g. Introduction, Class 1, Day 2..."
                    />
                  </div>

                  <MediaInput
                    label={<><Video className="inline h-4 w-4 mr-1" /> Video Content <span className="text-red-500">*</span></>}
                    type="video"
                    value={lesson.videoUrl}
                    onChange={(val) => handleLessonChange(index, "videoUrl", val)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    help="Paste a YouTube/Vimeo link, or upload an MP4 file."
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Add Lesson Button */}
          <button
            onClick={addLesson}
            className="mt-6 w-full flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-neutral-200 bg-neutral-50 px-4 py-6 text-sm font-medium text-neutral-600 transition-colors hover:border-neutral-300 hover:bg-neutral-100 hover:text-neutral-900"
          >
            <Plus className="h-5 w-5" />
            Add Another Video / Lesson
          </button>
          
        </div>
      </div>
    </>
  );
};

export default AdminCourseLessons;