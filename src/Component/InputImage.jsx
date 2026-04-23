import React, { useState } from "react";

export const InputImage = ({ label, id, accept = "image/*", onChange }) => {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(null);
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFileName(file.name);
    onChange(file);
  };
  return (
    <div className="flex flex-col  justify-center w-full space-y-1">
      <p className="text-sm ml-1">{label}</p>
      <label
        htmlFor={id}
        className="flex flex-col items-center justify-center w-full h-32 bg-neutral-secondary-medium  rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
      >
        
          <div className="flex flex-col items-center justify-center py-5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-gray-400 mb-2"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p className="text-sm text-gray-500">
              <span className="font-medium text-gray-700">Click to upload</span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
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
      {preview && (
        <span className="text-xs">{fileName}</span>
      )}
    </div>
  );
};
