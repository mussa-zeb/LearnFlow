
import axios from "axios";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "https://learn-flow-backend.vercel.app/api"
).replace(/\/+$/, "");

export const BACKEND_URL = API_URL.replace(/\/api$/, "");

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  create: (courseData, token) =>
    api.post("/courses", courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  update: (id, courseData, token) =>
    api.put(`/courses/${id}`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),

  delete: (id, token) =>
    api.delete(`/courses/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const adminApi = {
  login: (credentials) =>
    api.post("/admin/login", credentials),

  getProfile: (token) =>
    api.get("/admin/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export const uploadApi = {
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
