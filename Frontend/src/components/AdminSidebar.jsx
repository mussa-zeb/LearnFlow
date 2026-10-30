import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  LayoutDashboard,
  BookOpen,
  PlusCircle,
  LogOut,
  ArrowLeft,
} from "lucide-react";

const AdminSidebar = () => {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Manage Courses",
      path: "/admin/courses",
      icon: BookOpen,
    },
    {
      name: "Add Course",
      path: "/admin/courses/new",
      icon: PlusCircle,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-neutral-100 bg-white lg:flex">
      <div className="flex h-16 items-center px-6 border-b border-neutral-100">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-neutral-900 tracking-tight">
            LearnFlow
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-neutral-100 p-4 space-y-1">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-all duration-150 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 transition-all duration-150 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;