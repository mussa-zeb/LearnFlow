import { Link, useLocation } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import {
  LayoutDashboard, BookOpen, PlusCircle, LogOut, ArrowLeft, X,
} from "lucide-react";

const AdminSidebar = ({ mobileOpen, onClose }) => {
  const { logout } = useAdminAuth();
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Courses", path: "/admin/courses", icon: BookOpen },
    { name: "Add Course", path: "/admin/courses/new", icon: PlusCircle },
  ];

  const inner = (
    <>
      <div className="flex h-16 items-center justify-between px-6 border-b border-neutral-100">
        <Link to="/" className="flex items-center gap-2" onClick={onClose}>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-900 text-white shadow-sm">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-lg font-semibold text-neutral-900 tracking-tight">
            LearnFlow
          </span>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 rounded-lg text-neutral-500 hover:bg-neutral-100"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-6">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
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
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to site
        </Link>
        <button
          onClick={() => {
            logout();
            onClose();
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-50 hidden h-screen w-72 flex-col border-r border-neutral-100 bg-white lg:flex">
        {inner}
      </aside>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={onClose}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-72 max-w-[85vw] flex-col bg-white shadow-xl flex transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {inner}
        </aside>
      </div>
    </>
  );
};

export default AdminSidebar;