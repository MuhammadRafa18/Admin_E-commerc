import { useState } from "react";
import { InputText } from "../Component/InputText";
import { UseAction } from "../hooks/UseAction";
import { InputSelect } from "../Component/InputSelect";

export const FormCategories = ({ data, onSuccess, onClose }) => {
  const { handleSubmit, loading } = UseAction();
  const [category, setcategory] = useState({
    category: data?.category ?? "",
    type: data?.type ?? "",
  });
  const set = (key) => (e) => setcategory({ ...category, [key]: e.target?.value ?? e });
  const HandleForm = async (e) => {
    e.preventDefault();
    await handleSubmit({
      endpoint: "/admin/category",
      data: category,
      id: data?.id ?? null,
      onSuccess: () => {
        onSuccess?.();
        onClose?.();
      },
    });
  };
  const typeOption = [
    { value: "skincare", label: "Skincare" },
    { value: "fashion", label: "Fashion" },
  ];
  return (
    <form
      onSubmit={HandleForm}
      className="space-y-4 max-h-[75vh] overflow-y-auto py-3 px-1.5 hide-scrollbar"
    >
      <InputText
        label="Category"
        value={category.category}
        onChange={set("category")}
        required
      />
      <InputSelect
        label="Type"
        value={category.type}
        options={typeOption}
        placeholder="Pilih Type"
        required
        onChange={(val, selected) =>
          setcategory((prev) => ({
            ...prev,
            type: selected?.value ?? "",
          }))
        }
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
