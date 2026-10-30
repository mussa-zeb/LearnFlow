import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { coursesApi } from "../../utils/api";
import CourseCard from "../../components/CourseCard";

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await coursesApi.getAll();
        setCourses(data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,0,0,0.02),rgba(255,255,255,0))]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="text-center max-w-3xl mx-auto">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 leading-tight mb-6">
              Learn without limits,
              <br className="hidden sm:block" />
              on your own schedule
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed mb-10 max-w-2xl mx-auto">
              Explore a curated collection of courses designed to help you grow
              your skills. No sign-ups, no distractions—just pure learning.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/courses"
                className="group inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 focus:ring-offset-white"
              >
                Browse all courses
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:bg-neutral-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-neutral-200 focus:ring-offset-2 focus:ring-offset-white"
              >
                View featured
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-2">
                Featured courses
              </h2>
              <p className="text-neutral-600">
                Handpicked courses to get you started
              </p>
            </div>
            <Link
              to="/courses"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors duration-150 self-start sm:self-end"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="animate-pulse overflow-hidden rounded-2xl border border-neutral-100 bg-white"
                >
                  <div className="aspect-[16/9] w-full bg-neutral-100" />
                  <div className="p-5 space-y-3">
                    <div className="h-5 bg-neutral-100 rounded-md w-3/4" />
                    <div className="h-4 bg-neutral-100 rounded-md w-full" />
                    <div className="h-4 bg-neutral-100 rounded-md w-5/6" />
                    <div className="pt-4 border-t border-neutral-50 flex justify-between">
                      <div className="h-4 bg-neutral-100 rounded-md w-20" />
                      <div className="h-4 bg-neutral-100 rounded-md w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : courses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50 mb-4">
                <BookOpen className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">
                No courses yet
              </h3>
              <p className="text-neutral-600 max-w-sm">
                Courses will appear here once the admin adds them.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="w-full bg-neutral-50/50 py-16 sm:py-20 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
              Why LearnFlow?
            </h2>
            <p className="text-neutral-600">
              A simple, focused approach to online learning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <BookOpen className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Curated content
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Every course is thoughtfully structured to deliver clear,
                actionable knowledge.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Clock className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                Learn at your pace
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                No deadlines or pressure. Pick up where you left off, whenever
                it works for you.
              </p>
            </div>
            <div className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900/5 mb-4">
                <Sparkles className="h-5 w-5 text-neutral-900" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-2">
                No barriers
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Browse and learn instantly. No account creation or login
                required for students.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;