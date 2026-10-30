import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const BACKEND_URL = API_URL.replace(/\/api\/?$/, "");

// Resolves relative upload paths to absolute URLs.
// Absolute URLs (YouTube, Vimeo, Cloudinary, etc.) are returned unchanged.
export const resolveMediaUrl = (url) => {
  if (!url) return "";
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("//")
  ) {
    return url;
  }
  return `${BACKEND_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const coursesApi = {
  getAll: () => api.get("/courses"),
  getById: (id) => api.get(`/courses/${id}`),
  getAllAdmin: (token) =>
    api.get("/courses/all", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  create: (courseData, token) =>
    api.post("/courses", courseData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  update: (id, courseData, token) =>
    api.put(`/courses/${id}`, courseData, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  delete: (id, token) =>
    api.delete(`/courses/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const adminApi = {
  login: (credentials) => api.post("/admin/login", credentials),
  getProfile: (token) =>
    api.get("/admin/profile", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

export const uploadApi = {
  /**
   * Upload a file to backend.
   * @param {File} file
   * @param {"image"|"video"} type
   * @param {string} token - admin JWT
   * @param {(progressEvent) => void} onProgress
   * @returns Promise<{data: {url: string}}>  -- url is relative, e.g. "/uploads/abc.mp4"
   */
  uploadFile: (file, type, token, onProgress) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post(`/upload/${type}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: onProgress,
    });
  },
};

export default api;