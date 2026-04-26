import React, { useState } from "react";

export const InputImage = ({
  label,
  id,
  accept = "image/*",
  onChange,
  required,
}) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    setError(false);
    onChange(file);
  };

  const handleInvalid = () => {
    if (required && !preview) setError(true);
  };

  return (
    <div className="flex flex-col justify-center w-full space-y-1">
      <p className="text-sm ml-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </p>

      <label
        htmlFor={id}
        onClick={handleInvalid}
        className={`flex flex-col items-center justify-center w-full h-32 rounded-base cursor-pointer transition-colors
          ${
            error
              ? "bg-red-50 border border-red-300"
              : "bg-neutral-secondary-medium hover:bg-neutral-tertiary-medium"
          }`}
      >
        <div className="flex flex-col items-center justify-center py-5">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={error ? "#ef4444" : "currentColor"}
            strokeWidth="1.5"
            className="mb-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className={`text-sm ${error ? "text-red-500" : "text-gray-500"}`}>
            <span className="font-medium">Click to upload</span>
          </p>
          <p
            className={`text-xs mt-1 ${error ? "text-red-400" : "text-gray-400"}`}
          >
            SVG, PNG, JPG (MAX. 800x400px)
          </p>
        </div>

        <input
          id={id}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
      </label>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 ml-1">{label} wajib diisi</p>
      )}

      {/* File name */}
      {preview && !error && (
        <span className="text-xs text-gray-500 ml-1">{fileName}</span>
      )}
    </div>
  );
};
