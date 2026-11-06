import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// User pages
import Home from "./Modules/User/Home";
import Courses from "./Modules/User/Courses";
import CourseDetail from "./Modules/User/CourseDetail";
import Learn from "./Modules/User/Learn";
import About from "./Modules/User/About";
import Contact from "./Modules/User/Contact";
import FAQ from "./Modules/User/FAQ";
import Terms from "./Modules/User/Terms";
import Privacy from "./Modules/User/Privacy";
import NotFound from "./Modules/User/NotFound";
import Roadmap from "./Modules/User/Roadmap"; 
import RoadmapDetail from "./Modules/User/RoadmapDetail";

// Admin pages
import AdminLogin from "./Modules/Admin/AdminLogin";
import AdminDashboard from "./Modules/Admin/AdminDashboard";
import AdminCourses from "./Modules/Admin/AdminCourses";
import CourseForm from "./Modules/Admin/CourseForm";
import AdminCourseLessons from "./Modules/Admin/AdminCourseLessons"; 
import AdminRoadmaps from "./Modules/Admin/AdminRoadmaps"; 
import RoadmapForm from "./Modules/Admin/RoadmapForm"; 
import AdminCategories from "./Modules/Admin/AdminCategories";

import { AdminAuthProvider, useAdminAuth } from "./Shared/context/AdminAuthContext";
import UserLayout from "./Shared/components/UserLayout";
import AdminLayout from "./Shared/components/AdminLayout";
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
      
      {/* Roadmap Routes */}
      <Route path="/roadmap" element={<UserLayout><Roadmap /></UserLayout>} />
      <Route path="/roadmap/:id" element={<UserLayout><RoadmapDetail /></UserLayout>} />
      
      {/* Course Routes */}
      <Route path="/courses" element={<UserLayout><Courses /></UserLayout>} />
      <Route path="/courses/:id" element={<UserLayout><CourseDetail /></UserLayout>} />
      <Route path="/learn/:id" element={<UserLayout><Learn /></UserLayout>} />
      
      {/* Info Routes */}
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
  path="/admin/categories"
  element={
    <AdminRoute>
      <AdminCategories />
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

      {/* Admin Roadmap Routes */}
      <Route
        path="/admin/roadmaps"
        element={
          <AdminRoute>
            <AdminRoadmaps />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/roadmaps/new"
        element={
          <AdminRoute>
            <RoadmapForm />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/roadmaps/edit/:id"
        element={
          <AdminRoute>
            <RoadmapForm />
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