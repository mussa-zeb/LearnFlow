import { Link } from "react-router-dom";
import { Clock, BookOpen } from "lucide-react";
import { resolveMediaUrl } from "../utils/api";

const CourseCard = ({ course }) => {
  const thumb = resolveMediaUrl(course.thumbnail);

  return (
    <Link
      to={`/courses/${course._id}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-50">
        {thumb ? (
          <img
            src={thumb}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-12 w-12 text-neutral-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/0 group-hover:from-black/5 group-hover:to-transparent transition-all duration-300" />
        <span className="absolute left-3 top-3 inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-neutral-700 shadow-sm backdrop-blur-sm ring-1 ring-black/5">
          {course.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2 leading-snug mb-2 group-hover:text-neutral-800 transition-colors duration-150">
          {course.title}
        </h3>
        <p className="text-sm text-neutral-600 line-clamp-3 leading-relaxed mb-4 flex-1">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-neutral-50">
          <div className="flex items-center gap-1.5 text-neutral-500">
            <Clock className="h-4 w-4" />
            <span className="text-xs font-medium">{course.duration}</span>
          </div>
          <span className="text-sm font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors duration-150">
            Learn →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;