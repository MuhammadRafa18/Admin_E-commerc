import React, { useState } from "react";
import { InputText } from "../Component/InputText";
import { UseAction } from "../hooks/UseAction";

export const FormFaq = ({ data, onSuccess, onClose }) => {
  const [Faq, setFaq] = useState({
    category: data?.category ?? "",
  });
  const { handleSubmit, loading } = UseAction();
  const set = (key) => (e) => setFaq({ ...Faq, [key]: e.target?.value ?? e });
  const HandleForm = async (e) => {
    e.preventDefault();
    await handleSubmit({
      endpoint: "/admin/Faq_category",
      data: Faq,
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
        label="Faq Category"
        value={Faq.category}
        onChange={set("category")}
        required
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
