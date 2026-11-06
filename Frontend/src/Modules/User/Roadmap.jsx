import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  roadmapsApi,
  coursesApi,
  resolveMediaUrl,
} from "../../Shared/utils/api";
import {
  Map,
  ArrowRight,
  Clock,
  Layers,
  BookOpen,
  BarChart,
} from "lucide-react";

const Roadmap = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roadmapsRes, coursesRes] = await Promise.all([
          roadmapsApi.getAll(),
          coursesApi.getAll(),
        ]);
        setRoadmaps(roadmapsRes.data);
        setCourses(coursesRes.data.slice(0, 3)); // Get top 3 recommended
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      {/* Header */}
      <section className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 mb-6">
            Learning Roadmaps
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Choose a structured path to build your skills step-by-step, complete
            key milestones, and achieve your goals.
          </p>
        </div>
      </section>

      {/* Roadmaps Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {loading ? (
          <div className="text-center py-20 text-neutral-500">
            Loading roadmaps...
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
            <Map className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              No roadmaps available yet
            </h3>
            <p className="text-neutral-500">Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map((rm) => (
              <Link
                key={rm._id}
                to={`/roadmap/${rm._id}`}
                className="group flex flex-col bg-white rounded-3xl border border-neutral-100 p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-2xl bg-neutral-900 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                  <Map className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {rm.title}
                </h2>

                {/* Categories */}
                {(rm.categories || []).length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {rm.categories.map((c) => (
                      <span
                        key={c._id || c}
                        className="inline-flex items-center rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-neutral-50 pt-4 mt-auto">
                  <div className="flex items-center gap-4 text-xs font-medium text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Layers className="h-3.5 w-3.5" />{" "}
                      {rm.contentType === "pdf"
                        ? "PDF Guide"
                        : `${rm.steps?.length || 0} Steps`}
                    </span>
                  </div>
                  <span className="flex items-center gap-1 text-sm font-semibold text-neutral-900 group-hover:gap-2 transition-all">
                    View <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Recommended Courses Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 border-l-4 border-neutral-900 pl-4 mb-1">
              Recommended Courses
            </h2>
            <p className="text-neutral-600 pl-4">
              Handpicked courses to help you move forward on your journey.
            </p>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 transition-colors self-start sm:self-end"
          >
            View All Courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => {
            const primaryCategory =
              (course.categories || [])[0]?.name || "General";
            const hoursLabel = course.durationMinutes
              ? `${Math.round(course.durationMinutes / 60)}h`
              : "Self-paced";

            return (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group flex flex-col rounded-2xl border border-neutral-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                  {course.thumbnail ? (
                    <img
                      src={resolveMediaUrl(course.thumbnail)}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <BookOpen className="h-10 w-10 text-neutral-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-bold text-neutral-900 uppercase tracking-wider">
                    {primaryCategory}
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-semibold text-neutral-900 line-clamp-1 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-4 flex-1">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between border-t border-neutral-50 pt-3 mt-auto">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                      <Clock className="h-3.5 w-3.5" /> {course.duration}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-neutral-500 font-medium">
                      <BarChart className="h-3.5 w-3.5" /> {hoursLabel}
                    </div>
                    <div className="h-7 w-7 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-neutral-700 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Roadmap;