import React, { useState } from "react";
import { UseFecth } from "../hooks/UseFecth";
import { InputImage } from "../Component/InputImage";
import { UseAction } from "../hooks/UseAction";

export const FormBanner = ({ data, onSuccess, onClose }) => {
    const [imageError, setImageError] = useState({
    banner: false,
  });
  const [files, setFiles] = useState({
    banner: null,
  });
  const {handleSubmit,loading} = UseAction()

  const HandleForm = async (e) => {
    e.preventDefault();
     if (!data) {
      const errors = {
        banner: !files.banner,
      };
      setImageError(errors);

      if (Object.values(errors).some(Boolean)) return;
    }
    await handleSubmit({
      endpoint: "/admin/banner",
      files: files,

      id: data?.id ?? null,
      onSuccess: () => {
        onSuccess?.();
        onClose?.();
      },
    });
  };

  return (
    <form
      onSubmit={HandleForm}
      className="space-y-4 max-h-[75vh] overflow-y-auto py-3 px-1.5 hide-scrollbar"
    >
      <InputImage
        label="Image Banner"
        id="banner"
        required={!data}
        hasError={imageError.banner}
        onChange={(file) => {
          setFiles({ ...files, banner: file });
          setImageError({ ...imageError, banner: false });
        }}
      />
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-black text-white py-2 rounded-full text-sm cursor-pointer"
        >
          {data ? "Update" : "Simpan"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-black py-2 rounded-full text-sm cursor-pointer"
        >
          Batal
        </button>
      </div>
    </form>
  );
};
