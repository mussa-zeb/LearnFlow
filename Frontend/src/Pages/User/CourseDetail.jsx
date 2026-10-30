import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { coursesApi, resolveMediaUrl } from "../../utils/api";
import VideoPlayer from "../../components/VideoPlayer";
import { Clock, BookOpen, ArrowRight, ArrowLeft, Play, CheckCircle, ListVideo } from "lucide-react";

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id);
        setCourse(data);
      } catch (error) {
        setError("Course not found");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  if (loading) return <div className="p-12 text-center text-neutral-500">Loading...</div>;
  if (error || !course) return <div className="p-12 text-center text-neutral-500">Course not found.</div>;

  const previewUrl = resolveMediaUrl(course.previewVideoUrl);
  const thumbUrl = resolveMediaUrl(course.thumbnail);
  const lessons = course.lessons || [];

  return (
    <>
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <Link to="/courses" className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            <div className="lg:col-span-3 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-black shadow-sm aspect-video">
                {previewUrl ? (
                  <VideoPlayer src={previewUrl} title={course.title} className="h-full w-full" />
                ) : thumbUrl ? (
                  <img src={thumbUrl} alt={course.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-neutral-50">
                    <Play className="h-14 w-14 text-neutral-300" />
                  </div>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-neutral-900 mb-4">{course.title}</h1>
                <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">{course.description}</p>
                <div className="flex items-center gap-4 text-neutral-600">
                  <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /><span className="text-sm font-medium">{course.duration}</span></div>
                  <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span className="text-sm font-medium">{course.category}</span></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="sticky top-20 overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
                <div className="p-6 space-y-4">
                  <h3 className="text-lg font-medium text-neutral-900">This course includes:</h3>
                  <ul className="space-y-3 text-sm text-neutral-600">
                    <li className="flex items-center gap-2"><ListVideo className="h-4 w-4" /> {lessons.length || 1} on-demand video{lessons.length !== 1 ? 's' : ''}</li>
                    <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration} of content</li>
                    <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4" /> Full lifetime access</li>
                  </ul>
                  <Link to={`/learn/${course._id}`} className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white shadow-sm hover:bg-neutral-800">
                    Start learning <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">About this course</h2>
              <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">{course.content}</div>
            </div>
          </div>

          {/* Curriculum */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Course Curriculum</h2>
            <div className="rounded-2xl border border-neutral-100 bg-white overflow-hidden shadow-sm">
              {lessons.length > 0 ? (
                lessons.map((lesson, idx) => (
                  <Link 
                    key={idx} 
                    to={`/learn/${course._id}?lesson=${idx}`}
                    className="flex items-center gap-3 p-4 border-b border-neutral-50 last:border-0 hover:bg-neutral-50 transition-colors group cursor-pointer"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-xs font-medium text-neutral-600 group-hover:bg-neutral-200 transition-colors">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900 group-hover:text-black">{lesson.title}</p>
                    </div>
                    <Play className="h-4 w-4 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                  </Link>
                ))
              ) : (
                <div className="p-4 text-sm text-neutral-500">Course content available upon enrollment.</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default CourseDetail;