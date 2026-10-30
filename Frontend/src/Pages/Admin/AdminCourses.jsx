import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { coursesApi, resolveMediaUrl } from "../../utils/api";
import { Plus, Pencil, Trash2, BookOpen, Search, ListVideo } from "lucide-react";

const AdminCourses = () => {
  const { token } = useAdminAuth();
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  // "all" | "published" | "draft"
  const statusFilter = searchParams.get("status") || "all";

  const fetchCourses = async () => {
    try {
      const { data } = await coursesApi.getAllAdmin(token);
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCourses();
    }
  }, [token]);

  useEffect(() => {
    let result = courses;

    if (statusFilter === "published") {
      result = result.filter((c) => c.isPublished);
    } else if (statusFilter === "draft") {
      result = result.filter((c) => !c.isPublished);
    }

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCourses(result);
  }, [searchTerm, courses, statusFilter]);

  const setStatus = (status) => {
    if (status === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", status);
    }
    setSearchParams(searchParams);
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this course? This will also delete all its videos."
      )
    ) {
      setDeleteLoading(id);
      try {
        await coursesApi.delete(id, token);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Failed to delete course");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-1">
                Manage Courses
              </h1>
              <p className="text-neutral-600">
                Create, edit, and manage all your courses
              </p>
            </div>
            <Link
              to="/admin/courses/new"
              className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:shadow-md self-start sm:self-end"
            >
              <Plus className="h-4 w-4" />
              Add new course
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full py-8">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div className="relative w-full lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["all", "published", "draft"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    statusFilter === s
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {s === "all" ? "All" : s === "published" ? "Published" : "Drafts"}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="animate-pulse rounded-2xl border border-neutral-100 bg-white p-5"
                >
                  <div className="h-5 bg-neutral-100 rounded-md w-1/3 mb-2" />
                  <div className="h-4 bg-neutral-100 rounded-md w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredCourses.length > 0 ? (
            <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-100">
                  <thead className="bg-neutral-50/50">
                    <tr>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider hidden md:table-cell">
                        Category
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider hidden lg:table-cell">
                        Videos
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 bg-white">
                    {filteredCourses.map((course) => (
                      <tr
                        key={course._id}
                        className="hover:bg-neutral-50/50 transition-colors duration-150"
                      >
                        <td className="px-4 sm:px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-14 sm:h-12 sm:w-16 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                              {course.thumbnail ? (
                                <img
                                  src={resolveMediaUrl(course.thumbnail)}
                                  alt={course.title}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <BookOpen className="h-4 w-4 text-neutral-300" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-neutral-900 truncate">
                                {course.title}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                          <span className="inline-flex items-center rounded-full bg-neutral-50 px-2 py-0.5 text-xs font-medium text-neutral-700 ring-1 ring-neutral-100">
                            {course.category}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 hidden lg:table-cell">
                          <span className="text-sm text-neutral-600">
                            {course.lessons?.length || 0} Videos
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                              course.isPublished
                                ? "bg-green-50 text-green-700 ring-green-100"
                                : "bg-amber-50 text-amber-700 ring-amber-100"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-4 sm:px-6 py-4 text-right">
                          <div className="flex flex-wrap items-center justify-end gap-2">
                            <Link
                              to={`/admin/courses/${course._id}/lessons`}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-blue-700 border border-blue-100 bg-blue-50 hover:bg-blue-100"
                              title="Manage Videos"
                            >
                              <ListVideo className="h-3 w-3" />
                              Curriculum
                            </Link>

                            <Link
                              to={`/admin/courses/edit/${course._id}`}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50"
                            >
                              <Pencil className="h-3 w-3" />
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(course._id)}
                              disabled={deleteLoading === course._id}
                              className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-700 border border-red-100 bg-white hover:bg-red-50 disabled:opacity-50"
                            >
                              <Trash2 className="h-3 w-3" />
                              {deleteLoading === course._id ? "..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-neutral-100 bg-white">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50 mb-4">
                <BookOpen className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">
                No courses found
              </h3>
              <p className="text-neutral-600 mb-6 max-w-sm">
                {searchTerm || statusFilter !== "all"
                  ? "Try a different search term or filter."
                  : "Get started by creating your first course."}
              </p>
              {!searchTerm && statusFilter === "all" && (
                <Link
                  to="/admin/courses/new"
                  className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800"
                >
                  <Plus className="h-4 w-4" />
                  Add course
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;