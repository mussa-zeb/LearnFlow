import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { BookOpen, LayoutDashboard, LogIn, Search } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { isAuthenticated } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          <Link to="/" className="flex items-center gap-2 group transition-all duration-200 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm group-hover:shadow-md transition-all duration-200">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-lg font-semibold text-neutral-900 tracking-tight hidden sm:block">LearnFlow</span>
          </Link>

          {/* Global Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-neutral-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-full border border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-100 transition-all"
              />
            </div>
          </form>

          <nav className="flex items-center gap-1 sm:gap-2 shrink-0">
            <Link to="/" className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${location.pathname === "/courses" ? "bg-neutral-50 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}>
              Home
            </Link>
            <Link to="/courses" className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${location.pathname === "/courses" ? "bg-neutral-50 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}>
              Courses
            </Link>
            <Link to="/about" className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${location.pathname === "/about" ? "bg-neutral-50 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}>
              About
            </Link>
            <Link to="/contact" className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 ${location.pathname === "/contact" ? "bg-neutral-50 text-neutral-900" : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"}`}>
              Contact
            </Link>

            {isAuthenticated ? (
              <Link to="/admin/dashboard" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-all duration-150 hover:bg-neutral-50 hover:text-neutral-900">
                <LayoutDashboard className="h-4 w-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </Link>
            ) : (
              <Link to="/admin/login" className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 transition-all duration-150 hover:bg-neutral-50 hover:text-neutral-900">
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;