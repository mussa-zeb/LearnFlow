import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAdminAuth } from "../../Shared/context/AdminAuthContext";
import { roadmapsApi } from "../../Shared/utils/api";
import { Plus, Pencil, Trash2, Map, FileText } from "lucide-react";

const AdminRoadmaps = () => {
  const { token } = useAdminAuth();
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const fetchRoadmaps = async () => {
    try {
      const { data } = await roadmapsApi.getAllAdmin(token);
      setRoadmaps(data);
    } catch (error) {
      console.error("Error fetching roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRoadmaps();
  }, [token]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this roadmap?")) {
      setDeleteLoading(id);
      try {
        await roadmapsApi.delete(id, token);
        fetchRoadmaps();
      } catch (error) {
        alert("Failed to delete roadmap");
      } finally {
        setDeleteLoading(null);
      }
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-white border-b border-neutral-100">
        <div className="px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-1">Manage Roadmaps</h1>
            <p className="text-neutral-600">Create and manage learning paths for your users.</p>
          </div>
          <Link
            to="/admin/roadmaps/new"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-neutral-800 self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Add new roadmap
          </Link>
        </div>
      </div>

      <div className="w-full py-8 px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center text-neutral-500">Loading...</div>
        ) : roadmaps.length > 0 ? (
          <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-neutral-100">
              <thead className="bg-neutral-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Roadmap</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Steps</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-neutral-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 bg-white">
                {roadmaps.map((rm) => (
                  <tr key={rm._id} className="hover:bg-neutral-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-neutral-100 rounded-lg flex items-center justify-center text-neutral-600">
                          <Map className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-neutral-900">{rm.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-neutral-600">{rm.steps?.length || 0} Steps</td>
                    <td className="px-6 py-4 text-sm text-neutral-600 capitalize flex items-center gap-1">
                       <FileText className="h-3.5 w-3.5" /> {rm.contentType}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
                        rm.isPublished ? "bg-green-50 text-green-700 ring-green-100" : "bg-amber-50 text-amber-700 ring-amber-100"
                      }`}>
                        {rm.isPublished ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/roadmaps/edit/${rm._id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-neutral-700 border border-neutral-200 bg-white hover:bg-neutral-50"
                        >
                          <Pencil className="h-3 w-3" /> Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(rm._id)}
                          disabled={deleteLoading === rm._id}
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-red-700 border border-red-100 bg-white hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 className="h-3 w-3" /> {deleteLoading === rm._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-neutral-100">
             <Map className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
             <h3 className="text-lg font-medium text-neutral-900 mb-2">No roadmaps found</h3>
             <p className="text-neutral-500 mb-6">Get started by creating your first learning roadmap.</p>
             <Link to="/admin/roadmaps/new" className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">
                <Plus className="h-4 w-4" /> Add Roadmap
             </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRoadmaps;