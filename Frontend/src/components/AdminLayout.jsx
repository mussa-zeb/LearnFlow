import AdminSidebar from "./AdminSidebar";
import useScrollToTop from "../hooks/useScrollToTop";

const AdminLayout = ({ children }) => {
  useScrollToTop();

  return (
    <div className="flex min-h-screen bg-neutral-50/40">
      <AdminSidebar />
      <main className="flex-1 lg:ml-72">
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
};

export default AdminLayout;