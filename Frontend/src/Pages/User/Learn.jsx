import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { coursesApi, resolveMediaUrl } from "../../utils/api";
import VideoPlayer from "../../components/VideoPlayer";
import { ArrowLeft, CheckCircle, Clock, BookOpen, PlayCircle } from "lucide-react";

const Learn = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  // Read the 'lesson' query param from URL. Fallback to 0 if not present.
  const lessonParam = searchParams.get("lesson");
  const initialIndex = lessonParam ? parseInt(lessonParam, 10) : 0;
  
  const [activeLessonIndex, setActiveLessonIndex] = useState(
    !isNaN(initialIndex) && initialIndex >= 0 ? initialIndex : 0
  );

  // 1. Fetch Course Data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await coursesApi.getById(id);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  // 2. Load Progress from LocalStorage when course is loaded
  useEffect(() => {
    if (course) {
      try {
        const savedProgress = localStorage.getItem("learnflow_progress");
        if (savedProgress) {
          const parsed = JSON.parse(savedProgress);
          // If there is saved progress for this specific course, load it
          if (parsed[course._id]) {
            setCompletedLessons(parsed[course._id]);
          }
        }
      } catch (error) {
        console.error("Failed to load progress from localStorage", error);
      }
    }
  }, [course]);

  // 3. Update active lesson if the URL changes (e.g., user uses browser back button)
  useEffect(() => {
    const p = searchParams.get("lesson");
    if (p !== null) {
      const idx = parseInt(p, 10);
      if (!isNaN(idx) && idx >= 0) {
        setActiveLessonIndex(idx);
      }
    }
  }, [searchParams]);

  const handleLessonSelect = (index) => {
    setActiveLessonIndex(index);
    setSearchParams({ lesson: index.toString() });
  };

  // 4. Toggle Complete and Save to LocalStorage
  const toggleComplete = (index) => {
    let newCompleted;
    if (completedLessons.includes(index)) {
      newCompleted = completedLessons.filter((i) => i !== index);
    } else {
      newCompleted = [...completedLessons, index];
    }
    
    setCompletedLessons(newCompleted);

    // Save back to localStorage
    try {
      const savedProgress = localStorage.getItem("learnflow_progress");
      const parsed = savedProgress ? JSON.parse(savedProgress) : {};
      
      parsed[course._id] = newCompleted;
      localStorage.setItem("learnflow_progress", JSON.stringify(parsed));
    } catch (error) {
      console.error("Failed to save progress to localStorage", error);
    }
  };

  if (loading) return <div className="p-12 text-center text-neutral-500">Loading course...</div>;
  if (!course) return <div className="p-12 text-center text-neutral-500">Course not found.</div>;

  const lessons = course.lessons && course.lessons.length > 0 
    ? course.lessons 
    : (course.videoUrl ? [{ title: "Full Video", videoUrl: course.videoUrl }] : []);

  // Safety check: if URL has ?lesson=5 but there are only 3 lessons
  const safeLessonIndex = activeLessonIndex < lessons.length ? activeLessonIndex : 0;
  const activeLesson = lessons[safeLessonIndex];
  const videoSrc = resolveMediaUrl(activeLesson?.videoUrl || "");

  // Calculate progress percentage for the sidebar
  const progressPercent = lessons.length > 0 
    ? Math.round((completedLessons.length / lessons.length) * 100) 
    : 0;

  return (
    <>
      {/* Header */}
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex items-center justify-between">
          <div>
            <Link to={`/courses/${course._id}`} className="inline-flex items-center gap-1.5 text-sm text-neutral-600 hover:text-neutral-900 mb-2">
              <ArrowLeft className="h-4 w-4" /> Back to course overview
            </Link>
            <h1 className="text-xl sm:text-2xl font-semibold text-neutral-900">{course.title}</h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-neutral-600">
            <div className="flex items-center gap-1.5"><Clock className="h-4 w-4" /><span className="text-sm">{course.duration}</span></div>
            <div className="flex items-center gap-1.5"><BookOpen className="h-4 w-4" /><span className="text-sm">{course.category}</span></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
          
          {/* Video Player Area */}
          <div className="flex-1 space-y-6">
            {videoSrc ? (
              <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-black shadow-sm aspect-video">
                <VideoPlayer src={videoSrc} title={activeLesson?.title} className="h-full w-full" />
              </div>
            ) : (
              <div className="aspect-video bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200">
                <p className="text-neutral-500">No video uploaded for this lesson.</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-100 pb-6">
              <div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                  {safeLessonIndex + 1}. {activeLesson?.title || "Introduction"}
                </h2>
                <p className="text-sm text-neutral-500">Lesson {safeLessonIndex + 1} of {lessons.length}</p>
              </div>
              <button
                onClick={() => toggleComplete(safeLessonIndex)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                  completedLessons.includes(safeLessonIndex)
                    ? "bg-green-50 text-green-700 ring-1 ring-green-200"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                <CheckCircle className="h-4 w-4" />
                {completedLessons.includes(safeLessonIndex) ? "Completed" : "Mark as complete"}
              </button>
            </div>

            <div className="prose prose-neutral max-w-none text-neutral-700 leading-relaxed whitespace-pre-wrap">
              {course.content}
            </div>
          </div>

          {/* Playlist Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 rounded-2xl border border-neutral-100 bg-white shadow-sm overflow-hidden">
              
              {/* Progress Bar & Header */}
              <div className="bg-neutral-50 px-5 py-4 border-b border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-neutral-900">Course Curriculum</h3>
                  <span className="text-xs font-bold text-neutral-900">{progressPercent}%</span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-neutral-200 rounded-full mb-3 overflow-hidden">
                  <div 
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-neutral-500">{completedLessons.length} of {lessons.length} completed</p>
              </div>

              <div className="divide-y divide-neutral-50 max-h-[600px] overflow-y-auto">
                {lessons.map((lesson, index) => {
                  const isActive = index === safeLessonIndex;
                  const isCompleted = completedLessons.includes(index);
                  return (
                    <button
                      key={index}
                      onClick={() => handleLessonSelect(index)}
                      className={`w-full flex items-start gap-3 p-4 text-left transition-colors ${
                        isActive ? "bg-neutral-900/5" : "hover:bg-neutral-50"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                        isActive ? "bg-neutral-900 text-white" : isCompleted ? "bg-green-100 text-green-700" : "bg-neutral-100 text-neutral-500"
                      }`}>
                        {isCompleted ? <CheckCircle className="h-3.5 w-3.5" /> : isActive ? <PlayCircle className="h-3.5 w-3.5" /> : index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${isActive ? "text-neutral-900" : "text-neutral-700"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs text-neutral-500 mt-0.5">Video Lesson</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Learn;