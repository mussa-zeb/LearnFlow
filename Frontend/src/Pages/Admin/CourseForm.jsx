import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { coursesApi } from "../../utils/api";
import MediaInput from "../../components/MediaInput";
import { ArrowLeft, Save, Image, Video } from "lucide-react";

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    duration: "",
    durationMinutes: "",
    thumbnail: "",
    previewVideoUrl: "",
    content: "",
    isPublished: true,
    // Note: We no longer manage "lessons" here. It's done on the dedicated page.
  });

  const [loading, setLoading] = useState(false);
  const [loadingCourse, setLoadingCourse] = useState(isEditMode);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const fetchCourse = async () => {
        try {
          const { data } = await coursesApi.getById(id);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            category: data.category || "",
            duration: data.duration || "",
            durationMinutes: data.durationMinutes || "",
            thumbnail: data.thumbnail || "",
            previewVideoUrl: data.previewVideoUrl || "",
            content: data.content || "",
            isPublished: data.isPublished,
          });
        } catch (error) {
          setError("Failed to load course");
        } finally {
          setLoadingCourse(false);
        }
      };
      fetchCourse();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const setField = (field) => (value) => setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isEditMode) {
        await coursesApi.update(id, formData, token);
        // If it was a new course, we'd normally redirect to the lessons page here
        // For edits, we redirect back to the list
        navigate("/admin/courses");
      } else {
        // If creating a new course, we need to get the ID back to redirect to lessons
        const { data } = await coursesApi.create(formData, token);
        navigate(`/admin/courses/${data._id}/lessons`); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loadingCourse) {
    return <div className="p-12 text-center text-neutral-500">Loading...</div>;
  }

  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link to="/admin/courses" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>
          <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900">
            {isEditMode ? "Edit Course Details" : "Create New Course"}
          </h1>
        </div>
      </div>

      <div className="w-full bg-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {error && <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">{error}</div>}

            {/* Basic info */}
            <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Basic Information</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">Course Title <span className="text-red-500">*</span></label>
                  <input type="text" name="title" required value={formData.title} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-neutral-100" placeholder="e.g. Introduction to Web Development" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-900 mb-2">Description <span className="text-red-500">*</span></label>
                  <textarea name="description" required rows={4} value={formData.description} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm resize-none focus:ring-2 focus:ring-neutral-100" placeholder="Briefly describe what students will learn" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Category <span className="text-red-500">*</span></label>
                    <input type="text" name="category" required value={formData.category} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-neutral-100" placeholder="e.g. Programming" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Duration Label <span className="text-red-500">*</span></label>
                    <input type="text" name="duration" required value={formData.duration} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-neutral-100" placeholder="e.g. 4 hours" />
                  </div>
                  <div className="sm:col-span-1">
                    <label className="block text-sm font-medium text-neutral-900 mb-2">Duration (Minutes) <span className="text-red-500">*</span></label>
                    <input type="number" name="durationMinutes" required min={1} value={formData.durationMinutes} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm focus:ring-2 focus:ring-neutral-100" placeholder="e.g. 240" />
                  </div>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Course Media</h2>
              <div className="space-y-8">
                <MediaInput label={<><Image className="inline h-4 w-4 mr-1" /> Thumbnail</>} type="image" value={formData.thumbnail} onChange={setField("thumbnail")} placeholder="https://example.com/image.jpg" help="Recommended 16:9 ratio. JPG, PNG, or WEBP." />
                <MediaInput label={<><Video className="inline h-4 w-4 mr-1" /> Preview Video (Optional)</>} type="video" value={formData.previewVideoUrl} onChange={setField("previewVideoUrl")} placeholder="https://www.youtube.com/watch?v=..." help="Shown on the course details page before starting." />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-medium text-neutral-900 mb-4">Course Notes</h2>
              <textarea name="content" required rows={6} value={formData.content} onChange={handleChange} className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-sm resize-none focus:ring-2 focus:ring-neutral-100" placeholder="Write supplementary text, requirements, or notes..." />
              <div className="flex items-center gap-3 mt-4">
                <input type="checkbox" id="isPublished" name="isPublished" checked={formData.isPublished} onChange={handleChange} className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-400" />
                <label htmlFor="isPublished" className="text-sm font-medium text-neutral-900">Publish this course</label>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Link to="/admin/courses" className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50">Cancel</Link>
              <button type="submit" disabled={loading} className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 disabled:opacity-50">
                <Save className="h-4 w-4" /> {loading ? "Saving..." : isEditMode ? "Save Changes" : "Next: Add Videos"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CourseForm;