import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { coursesApi } from "../../utils/api";
import CourseCard from "../../components/CourseCard";
import { BookOpen, Search } from "lucide-react";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = useState(initialSearch);

  
  useEffect(() => {
    const query = searchParams.get("search") || "";
    setSearchTerm(query);
  }, [searchParams]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await coursesApi.getAll();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = courses;

    if (searchTerm) {
      result = result.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((course) => course.category === selectedCategory);
    }

    setFilteredCourses(result);
  }, [searchTerm, selectedCategory, courses]);

  const categories = [
    "all",
    ...new Set(courses.map((course) => course.category)),
  ];

  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-3">
              All Courses
            </h1>
            <p className="text-neutral-600 text-lg leading-relaxed">
              Explore our collection of courses and find the perfect one to
              start learning today.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
            <div className="relative w-full lg:max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-xl border border-neutral-200 bg-white py-2.5 pl-9 pr-3 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100 transition-all duration-150"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    selectedCategory === category
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {category === "all" ? "All" : category}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
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
          ) : filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-50 mb-4">
                <BookOpen className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="text-lg font-medium text-neutral-900 mb-1">
                No courses found
              </h3>
              <p className="text-neutral-600 max-w-sm">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Courses;