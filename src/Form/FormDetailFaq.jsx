import { UseFecth } from "../hooks/UseFecth";
import { UseAction } from "../hooks/UseAction";
import { useState } from "react";
import { InputText } from "../Component/InputText";
import { InputSelect } from "../Component/InputSelect";
import { RichTextEditor } from "../Component/RichTextEditor ";

export const FormDetailFaq = ({ data, onSuccess, onClose }) => {
  const { Data: Faq } = UseFecth(`/Faq_category`);
  const [detailFaq, setDetailFaq] = useState({
    faq_category_id:data?.faq_category?.id ?? null,
    quest: data?.quest ?? "",
    answer: data?.answer ?? "",
  });
  const { handleSubmit, loading } = UseAction();
  const set = (key) => (e) =>
    setDetailFaq({ ...detailFaq, [key]: e.target?.value ?? e });
  const categoryOptions =
    Faq?.data?.map((c) => ({
      value: c.id,
      label: c.category,
    })) ?? [];
  const HandleForm = async (e) => {
    e.preventDefault();
    await handleSubmit({
      endpoint: "/admin/DetailFaq",
      data: detailFaq,
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
      <InputSelect
        label="Category"
        value={detailFaq.faq_category_id}
        options={categoryOptions}
        placeholder="Pilih Faq Category"
        required
        onChange={(val, selected) =>
          setDetailFaq((prev) => ({
            ...prev,
            faq_category_id: selected?.value ?? "",
          }))
        }
      />
      <InputText
        label="Quest"
        value={detailFaq.quest}
        onChange={set("quest")}
        required
      />
      <div className="space-y-1">
        <label className="block text-sm font-medium">Answer</label>
        <RichTextEditor
          value={detailFaq.answer}
          onChange={(val) => setDetailFaq({ ...detailFaq, answer: val })}
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
