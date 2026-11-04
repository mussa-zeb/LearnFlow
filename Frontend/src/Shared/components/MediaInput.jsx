
import { useRef, useState } from "react";
import { Link as LinkIcon, Upload, X, Loader2 } from "lucide-react";
import { uploadApi, resolveMediaUrl } from "../utils/api";
import { useAdminAuth } from "../context/AdminAuthContext";

/**
 * @param {object} props
 * @param {string} props.label
 * @param {"image"|"video"} props.type
 * @param {string} props.value - Current stored value (relative or absolute)
 * @param {(v: string) => void} props.onChange
 * @param {string} [props.placeholder]
 * @param {string} [props.help]
 */
const MediaInput = ({
  label,
  type,
  value,
  onChange,
  placeholder,
  help,
}) => {
  const { token } = useAdminAuth();

  // Detect both local uploads and Cloudinary URLs.
  const [mode, setMode] = useState(() =>
    value &&
    (value.includes("/uploads/") ||
      value.includes("res.cloudinary.com"))
      ? "upload"
      : "url"
  );

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const { data } = await uploadApi.uploadFile(
        file,
        type,
        token,
        (evt) => {
          if (evt.total) {
            setProgress(
              Math.round((evt.loaded * 100) / evt.total)
            );
          }
        }
      );

      // Store the URL returned by the backend (Cloudinary or local).
      onChange(data.url);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Upload failed. Try again."
      );
    } finally {
      setUploading(false);

      if (fileRef.current) {
        fileRef.current.value = "";
      }
    }
  };

  const previewSrc = resolveMediaUrl(value);

  // Recognize both local uploads and Cloudinary media.
  const isUploadedVideo =
    Boolean(value) &&
    type === "video" &&
    (value.includes("/uploads/") ||
      value.includes("res.cloudinary.com"));

  return (
    <div>
      <label className="block text-sm font-medium text-neutral-900 mb-2">
        {label}
      </label>

      {/* Mode toggle */}
      <div className="inline-flex mb-3 rounded-lg border border-neutral-200 bg-neutral-50 p-0.5">
        <button
          type="button"
          onClick={() => setMode("url")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition ${
            mode === "url"
              ? "bg-white shadow-sm text-neutral-900"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <LinkIcon className="h-3 w-3" />
          Use URL
        </button>

        <button
          type="button"
          onClick={() => setMode("upload")}
          className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition ${
            mode === "upload"
              ? "bg-white shadow-sm text-neutral-900"
              : "text-neutral-600 hover:text-neutral-900"
          }`}
        >
          <Upload className="h-3 w-3" />
          Upload file
        </button>
      </div>

      {/* Input area */}
      {mode === "url" ? (
        <input
          type="url"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="block w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-900 shadow-sm placeholder:text-neutral-400 focus:border-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-100"
        />
      ) : (
        <div>
          {value ? (
            <div className="flex items-center gap-2 p-3 rounded-xl border border-neutral-200 bg-neutral-50">
              <span className="flex-1 truncate text-xs text-neutral-700">
                {value}
              </span>

              <button
                type="button"
                onClick={() => onChange("")}
                className="text-neutral-500 hover:text-red-600"
                aria-label="Remove"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <input
                ref={fileRef}
                type="file"
                accept={
                  type === "image" ? "image/*" : "video/*"
                }
                onChange={handleFile}
                disabled={uploading}
                className="block w-full text-sm text-neutral-700 file:mr-3 file:rounded-lg file:border-0 file:bg-neutral-900 file:px-3 file:py-2 file:text-xs file:font-medium file:text-white hover:file:bg-neutral-800 disabled:opacity-60"
              />

              {uploading && (
                <div className="mt-2">
                  <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-neutral-900 transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <p className="text-xs text-neutral-500 mt-1 flex items-center gap-1">
                    <Loader2 className="h-3 w-3 animate-spin" />
                    Uploading... {progress}%
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {help && (
        <p className="mt-1 text-xs text-neutral-500">
          {help}
        </p>
      )}

      {error && (
        <p className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}

      {/* Image preview */}
      {value && type === "image" && (
        <div className="mt-3 aspect-[16/9] w-full max-w-md overflow-hidden rounded-lg border border-neutral-100">
          <img
            src={previewSrc}
            alt="Preview"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Uploaded video preview */}
      {isUploadedVideo && (
        <div className="mt-3 aspect-[16/9] w-full max-w-md overflow-hidden rounded-lg border border-neutral-100 bg-black">
          <video
            src={previewSrc}
            controls
            className="h-full w-full"
          />
        </div>
      )}
    </div>
  );
};

export default MediaInput;
