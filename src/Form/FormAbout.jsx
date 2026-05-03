import React, { useState } from "react";
import { UseAction } from "../hooks/UseAction";
import { InputImage } from "../Component/InputImage";
import { InputText } from "../Component/InputText";
import { RichTextEditor } from "../Component/RichTextEditor ";
import { ButtonDelete } from "../Component/ButtonDelete";

export const FormAbout = ({ data, onSuccess, onClose }) => {
  const [About, setAbout] = useState({
    headline: data?.headline ?? "",
    title: data?.title ?? "",
    subtitle: data?.subtitle ?? "",
    paragraf: data?.paragraf ?? "",
    visi_misi: data?.visi_misi ?? "",
    powers:
      data?.powers?.map((v) => ({ 
        tempId: crypto.randomUUID(),
        id: v.id, label: v.label, icon: v.icon })) ??
      [],
  });
  const { handleSubmit, loading } = UseAction();
  const set = (key) => (e) => setAbout({ ...About, [key]: e.target?.value ?? e });
  const [files, setFiles] = useState({
    image: null,
    image_visi: null,
  });
  const [imageError, setImageError] = useState({
    image: false,
    image_visi: false,
  });

  const HandleForm = async (e) => {
    e.preventDefault();
    if (!data) {
      const errors = {
        image: !files.image,
      };
      setImageError(errors);

      if (Object.values(errors).some(Boolean)) return;
    }
    await handleSubmit({
      endpoint: "/admin/about",
      data: About,
      files: files,
      powers: About.powers,

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
      <InputText
        label="Headline"
        value={About.headline}
        onChange={set("headline")}
        required
      />
      <InputText
        label="Title"
        value={About.title}
        onChange={set("title")}
        required
      />
      <InputText
        label="Subtitle"
        value={About.subtitle}
        onChange={set("subtitle")}
        required
      />
      <InputImage
        label="Image About"
        id="image_about"
        required={!data}
        hasError={imageError.image}
        onChange={(file) => {
          setFiles({ ...files, image: file });
          setImageError({ ...imageError, image: false });
        }}
      />
      <InputImage
        label="Image Visi"
        id="image_visi"
        required={!data}
        hasError={imageError.image_visi}
        onChange={(file) => {
          setFiles({ ...files, image_visi: file });
          setImageError({ ...imageError, image_visi: false });
        }}
      />
      <div className="space-y-3">
        <label className="text-sm font-medium">Variants</label>

        {About?.powers?.map((v, i) => (
          <div
            key={v.tempId}
            className="rounded-2xl border border-default-medium bg-neutral-secondary-medium/40 p-3 sm:p-4 md:p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:gap-5 md:flex-row">
              {/* Preview */}
              <div className="flex justify-center md:justify-start">
                <div
                  className="
                  h-20 w-20
                  sm:h-24 sm:w-24
                  rounded-2xl
                  border border-dashed border-default-medium
                  bg-white
                  overflow-hidden
                  flex items-center justify-center
                  shrink-0
                "
                >
                  {v.icon ? (
                    <img
                      src={
                        typeof v.icon === "object"
                          ? URL.createObjectURL(v.icon)
                          : `http://localhost:8000/storage/${v.icon}`

                      }
                      alt="preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-xs text-body text-center px-2">
                      No Icon
                    </span>
                  )}
                </div>
              </div>

              {/* Form */}
              <div className="flex-1 space-y-4 min-w-0">
                {/* Top Header */}
                <div className="flex flex-col gap-3 min-[700px]:flex-row min-[700px]:items-start min-[700px]:justify-between">
                  {/* Label Input */}
                  <div className="flex-1 min-w-0">
                    <label className="mb-2 block text-sm font-medium text-heading">
                      Power Label
                    </label>

                    <input
                      type="text"
                      placeholder="Contoh: Fast Delivery"
                      className="
              w-full
              rounded-xl
              border border-default-medium
              bg-white
              px-3 py-2.5
              sm:px-4 sm:py-3
              text-sm
              text-heading
              shadow-xs
              outline-none
              transition-all
              duration-200
              focus:border-brand
              focus:ring-2
              focus:ring-brand/20
            "
                      value={v.label}
                      onChange={(e) => {
                        const newVariants = [...About.powers];
                        newVariants[i].label = e.target.value;

                        setAbout({
                          ...About,
                          powers: newVariants,
                        });
                      }}
                    />
                  </div>

                  {/* Delete Button */}
                  <div className="flex justify-end shrink-0">
                    <ButtonDelete
                      onClick={() => {
                        const newVariants = About.powers.filter(
                          (_, idx) => idx !== i,
                        );

                        setAbout({
                          ...About,
                          powers: newVariants,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Upload */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-heading">
                    Upload Icon
                  </label>

                  <label
                    className="
            flex flex-col gap-3
            sm:flex-row sm:items-center sm:justify-between
            cursor-pointer
            rounded-xl
            border border-dashed border-default-medium
            bg-white
            px-3 py-3
            sm:px-4
            transition
            hover:border-brand
            hover:bg-brand/5
          "
                  >
                    <span className="text-sm text-body break-all">
                      {v.icon?.name || "Choose image..."}
                    </span>

                    <span
                      className="
              inline-flex items-center justify-center
              rounded-lg
              bg-brand
              px-4 py-2
              text-xs sm:text-sm
              text-white
              w-full sm:w-auto
              shrink-0
            "
                    >
                      Browse File
                    </span>

                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];

                        const newVariants = [...About.powers];
                        newVariants[i].icon = file;

                        setAbout({
                          ...About,
                          powers: newVariants,
                        });
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          className="text-blue-500 text-sm cursor-pointer"
          onClick={() => {
            setAbout({
              ...About,
              powers: [
                ...About.powers,
                {
                  tempId: crypto.randomUUID(),
                  id: null,
                  label: "",
                  icon: "",
                  file: null,
                },
              ],
            });
          }}
        >
          Tambah Powers
        </button>
      </div>

      <div className="space-y-1">
        <label className="block text-sm font-medium">Paragraf</label>
        <RichTextEditor
          value={About.paragraf}
          onChange={(val) => setAbout({ ...About, paragraf: val })}
        />
      </div>
      <div className="space-y-1">
        <label className="block text-sm font-medium">Visi Misi</label>
        <RichTextEditor
          value={About.visi_misi}
          onChange={(val) => setAbout({ ...About, visi_misi: val })}
        />
      </div>

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
