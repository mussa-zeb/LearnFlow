import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-[calc(100vh-16rem)] items-center justify-center bg-white px-4 py-12">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <h1 className="text-7xl sm:text-8xl font-semibold tracking-tight text-neutral-900">
            404
          </h1>
        </div>
        <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 mb-3">
          Page not found
        </h2>
        <p className="text-neutral-600 leading-relaxed mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-800 hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            Go home
          </Link>
          <button
            onClick={() =>
    window.history.length > 1 ? window.history.back() : navigate("/")
  }
            className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm transition-all duration-200 hover:bg-neutral-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Go back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;