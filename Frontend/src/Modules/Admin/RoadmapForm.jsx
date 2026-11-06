import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import {
  roadmapsApi,
  coursesApi,
  categoriesApi,
  uploadApi,
} from "../../Shared/utils/api";
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  FileText,
  Upload,
  CheckCircle,
} from "lucide-react";

const RoadmapForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAdminAuth();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    steps: [
      {
        title: "",
        description: "",
        duration: "",
        difficulty: "Beginner",
        icon: "Home",
      },
    ],
    categories: [], // ← array of category IDs
    courseId: "",
    contentType: "text",
    pdfUrl: "",
    isPublished: false,
  });

  const [courses, setCourses] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [coursesRes, categoriesRes] = await Promise.all([
          coursesApi.getAllAdmin(token),
          categoriesApi.getAll(),
        ]);
        setCourses(coursesRes.data);
        setAvailableCategories(categoriesRes.data);

        if (isEditMode) {
          const { data } = await roadmapsApi.getById(id);
          setFormData({
            title: data.title || "",
            description: data.description || "",
            steps:
              data.steps?.length
                ? data.steps
                : [
                    {
                      title: "",
                      description: "",
                      duration: "",
                      difficulty: "Beginner",
                      icon: "Home",
                    },
                  ],
            categories: (data.categories || []).map((c) =>
              typeof c === "string" ? c : c._id
            ),
            courseId: data.courseId || "",
            contentType: data.contentType || "text",
            pdfUrl: data.pdfUrl || "",
            isPublished: data.isPublished || false,
          });
        }
      } catch (err) {
        setError("Failed to load data.");
      }
    };
    if (token) fetchInitialData();
  }, [id, isEditMode, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const toggleCategory = (categoryId) => {
    setFormData((prev) => {
      const has = prev.categories.includes(categoryId);
      return {
        ...prev,
        categories: has
          ? prev.categories.filter((c) => c !== categoryId)
          : [...prev.categories, categoryId],
      };
    });
  };

  // Steps Handlers
  const handleStepChange = (index, field, value) => {
    const newSteps = [...formData.steps];
    newSteps[index][field] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () =>
    setFormData({
      ...formData,
      steps: [
        ...formData.steps,
        {
          title: "",
          description: "",
          duration: "",
          difficulty: "Beginner",
          icon: "Home",
        },
      ],
    });

  const removeStep = (index) => {
    if (formData.steps.length === 1) return;
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  // File Upload for PDF
  const handlePdfUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { data } = await uploadApi.uploadFile(file, "document", token);
      setFormData((prev) => ({ ...prev, pdfUrl: data.url }));
    } catch (err) {
      setError("Failed to upload PDF. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const payload = {
      title: formData.title,
      description: formData.description,
      categories: formData.categories, // ← send categories array
      courseId: formData.courseId || null,
      contentType: formData.contentType,
      isPublished: formData.isPublished,
      steps: formData.contentType === "text" ? formData.steps : [],
      pdfUrl: formData.contentType === "pdf" ? formData.pdfUrl : "",
    };

    if (payload.contentType === "pdf" && !payload.pdfUrl) {
      setError("Please upload a PDF document before saving.");
      setLoading(false);
      return;
    }

    try {
      if (isEditMode) {
        await roadmapsApi.update(id, payload, token);
      } else {
        await roadmapsApi.create(payload, token);
      }
      navigate("/admin/roadmaps");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white pb-20">
      <div className="w-full border-b border-neutral-100 px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/admin/roadmaps"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to roadmaps
        </Link>
        <h1 className="text-2xl font-semibold text-neutral-900">
          {isEditMode ? "Edit Roadmap" : "Create New Roadmap"}
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm ring-1 ring-red-100">
              {error}
            </div>
          )}

          {/* Basic Info */}
          <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-4 mb-4">
              Basic Information
            </h2>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Roadmap Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm"
                placeholder="e.g. Frontend Developer Path"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                required
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm resize-none"
                placeholder="Describe the goal of this roadmap..."
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">
                Categories
              </label>
              {availableCategories.length === 0 ? (
                <p className="text-xs text-neutral-500">
                  No categories yet. Create categories in{" "}
                  <Link
                    to="/admin/categories"
                    className="underline text-neutral-900"
                  >
                    Manage Categories
                  </Link>
                  .
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map((cat) => {
                    const selected = formData.categories.includes(cat._id);
                    return (
                      <button
                        key={cat._id}
                        type="button"
                        onClick={() => toggleCategory(cat._id)}
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium border transition ${
                          selected
                            ? "bg-neutral-900 text-white border-neutral-900"
                            : "bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Assign to Course (Optional)
                </label>
                <select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-neutral-200 px-4 py-2.5 text-sm bg-white"
                >
                  <option value="">-- No specific course --</option>
                  {courses.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center mt-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isPublished"
                    checked={formData.isPublished}
                    onChange={handleChange}
                    className="h-5 w-5 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                  />
                  <span className="text-sm font-medium text-neutral-900">
                    Publish Roadmap
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Content Type */}
          <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
            <h2 className="text-lg font-medium text-neutral-900 border-b border-neutral-100 pb-4 mb-4">
              Roadmap Content Type
            </h2>
            <div className="flex gap-4 mb-4">
              <label
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer flex-1 ${
                  formData.contentType === "text"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200"
                }`}
              >
                <input
                  type="radio"
                  name="contentType"
                  value="text"
                  checked={formData.contentType === "text"}
                  onChange={handleChange}
                  className="hidden"
                />
                <FileText className="h-5 w-5" />{" "}
                <span className="text-sm font-medium">
                  Interactive Text Steps
                </span>
              </label>
              <label
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer flex-1 ${
                  formData.contentType === "pdf"
                    ? "border-neutral-900 bg-neutral-50"
                    : "border-neutral-200"
                }`}
              >
                <input
                  type="radio"
                  name="contentType"
                  value="pdf"
                  checked={formData.contentType === "pdf"}
                  onChange={handleChange}
                  className="hidden"
                />
                <Upload className="h-5 w-5" />{" "}
                <span className="text-sm font-medium">
                  Upload PDF Document
                </span>
              </label>
            </div>

            {formData.contentType === "pdf" && (
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
                <label className="block text-sm font-medium text-neutral-900 mb-2">
                  Upload PDF
                </label>
                {formData.pdfUrl ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-neutral-200">
                    <span className="text-sm text-green-700 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" /> PDF Uploaded
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, pdfUrl: "" })}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handlePdfUpload}
                    disabled={uploading}
                    className="block w-full text-sm text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white"
                  />
                )}
                {uploading && (
                  <p className="text-xs text-neutral-500 mt-2">Uploading PDF...</p>
                )}
              </div>
            )}
          </div>

          {/* Steps (Only show if contentType is text) */}
          {formData.contentType === "text" && (
            <div className="space-y-6 rounded-2xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-4 mb-4">
                <h2 className="text-lg font-medium text-neutral-900">
                  Roadmap Steps
                </h2>
                <button
                  type="button"
                  onClick={addStep}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Step
                </button>
              </div>

              <div className="space-y-6">
                {formData.steps.map((step, index) => (
                  <div
                    key={index}
                    className="relative bg-neutral-50 p-4 sm:p-6 rounded-2xl border border-neutral-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-neutral-900">
                        Step {index + 1}
                      </h3>
                      {formData.steps.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeStep(index)}
                          className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={step.title}
                          onChange={(e) =>
                            handleStepChange(index, "title", e.target.value)
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={step.description}
                          onChange={(e) =>
                            handleStepChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Duration (e.g., 3-6 Hours) *
                        </label>
                        <input
                          type="text"
                          required
                          value={step.duration}
                          onChange={(e) =>
                            handleStepChange(index, "duration", e.target.value)
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Difficulty
                        </label>
                        <select
                          value={step.difficulty}
                          onChange={(e) =>
                            handleStepChange(
                              index,
                              "difficulty",
                              e.target.value
                            )
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm bg-white"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-neutral-700 mb-1">
                          Icon
                        </label>
                        <select
                          value={step.icon}
                          onChange={(e) =>
                            handleStepChange(index, "icon", e.target.value)
                          }
                          className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm bg-white"
                        >
                          <option value="Home">Home</option>
                          <option value="Code">Code</option>
                          <option value="Layers">Layers</option>
                          <option value="Rocket">Rocket</option>
                          <option value="Trophy">Trophy</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <Link
              to="/admin/roadmaps"
              className="rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium hover:bg-neutral-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading || uploading}
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              <Save className="h-4 w-4" />{" "}
              {loading ? "Saving..." : "Save Roadmap"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapForm;