import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { coursesApi } from "../../utils/api";
import { BookOpen, Plus, Clock, Eye, FileText } from "lucide-react";

const AdminDashboard = () => {
  const { token } = useAdminAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const totalCourses = courses.length;
  const publishedCourses = courses.filter((c) => c.isPublished).length;
  const draftCourses = courses.filter((c) => !c.isPublished).length;
  const totalMinutes = courses.reduce(
    (acc, c) => acc + (c.durationMinutes || 0),
    0
  );
  const totalHours = Math.round((totalMinutes / 60) * 10) / 10;

  const stats = [
    {
      name: "Total Courses",
      value: totalCourses,
      icon: BookOpen,
      color: "bg-neutral-900/5 text-neutral-900",
    },
    {
      name: "Published",
      value: publishedCourses,
      icon: Eye,
      color: "bg-green-50 text-green-700",
    },
    {
      name: "Drafts",
      value: draftCourses,
      icon: FileText,
      color: "bg-amber-50 text-amber-700",
    },
    {
      name: "Total Hours",
      value: totalHours,
      icon: Clock,
      color: "bg-blue-50 text-blue-700",
    },
  ];

  return (
    <>
      <div className="w-full border-b border-neutral-100 bg-white">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-1">
                Dashboard
              </h1>
              <p className="text-neutral-600">
                Welcome back! Here's an overview of your courses.
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.name}
                className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">
                      {stat.name}
                    </p>
                    <p className="text-2xl sm:text-3xl font-semibold text-neutral-900">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.color}`}
                  >
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;