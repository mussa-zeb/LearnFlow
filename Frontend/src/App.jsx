import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AdminAuthProvider, useAdminAuth } from "./context/AdminAuthContext";

// User pages
import Home from "./Pages/User/Home";
import Courses from "./Pages/User/Courses";
import CourseDetail from "./Pages/User/CourseDetail";
import Learn from "./Pages/User/Learn";
import About from "./Pages/User/About";
import Contact from "./Pages/User/Contact";
import FAQ from "./Pages/User/FAQ";
import Terms from "./Pages/User/Terms";
import Privacy from "./Pages/User/Privacy";
import NotFound from "./Pages/User/NotFound";

// Admin pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminCourses from "./Pages/Admin/AdminCourses";
import CourseForm from "./Pages/Admin/CourseForm";
import AdminCourseLessons from "./Pages/Admin/AdminCourseLessons"; 

import UserLayout from "./components/UserLayout";
import AdminLayout from "./components/AdminLayout";
import "./App.css";

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAdminAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-neutral-300 border-t-neutral-900" />
          <span className="text-sm text-neutral-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <AdminLayout>{children}</AdminLayout>;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes with UserLayout */}
      <Route path="/" element={<UserLayout><Home /></UserLayout>} />
      <Route path="/courses" element={<UserLayout><Courses /></UserLayout>} />
      <Route path="/courses/:id" element={<UserLayout><CourseDetail /></UserLayout>} />
      <Route path="/learn/:id" element={<UserLayout><Learn /></UserLayout>} />
      <Route path="/about" element={<UserLayout><About /></UserLayout>} />
      <Route path="/contact" element={<UserLayout><Contact /></UserLayout>} />
      <Route path="/faq" element={<UserLayout><FAQ /></UserLayout>} />
      <Route path="/terms" element={<UserLayout><Terms /></UserLayout>} />
      <Route path="/privacy" element={<UserLayout><Privacy /></UserLayout>} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/courses"
        element={
          <AdminRoute>
            <AdminCourses />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/courses/new"
        element={
          <AdminRoute>
            <CourseForm />
          </AdminRoute>
        }
      />
            <Route
        path="/admin/courses/edit/:id"
        element={
          <AdminRoute>
            <CourseForm />
          </AdminRoute>
        }
      />
      
      
      <Route
        path="/admin/courses/:id/lessons"
        element={
          <AdminRoute>
            <AdminCourseLessons />
          </AdminRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<UserLayout><NotFound /></UserLayout>} />
    </Routes>
  );
}

function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AdminAuthProvider>
  );
}

export default App;