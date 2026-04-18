import { useEffect, useState } from "react";
import { RichTextEditor } from "../../Component/RichTextEditor ";
import { UseAction } from "../../hooks/UseAction";
import { UseFecth } from "../../hooks/UseFecth";

export const FormProduk = ({ data, onSuccess, onClose }) => {
  const { handleSubmit } = UseAction();
  const { Data: category } = UseFecth(`/category`);
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({
    image_produk: null,
    image_banner: null,
  });

  const HandleForm = async (e) => {
    e.preventDefault();
    await handleSubmit({
      endpoint: "/admin/product",
      data: form,
      files: files,
      id: data?.id ?? null,
      onSuccess: () => {
        onSuccess?.();
        onClose?.();
      },
    });
  };

  return (
    <>
      <form
        onSubmit={HandleForm}
        className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 hide-scrollbar"
      >
        <div class="flex flex-col  justify-center w-full space-y-1">
          <p className="text-sm ml-1">Image Product</p>
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-32 bg-neutral-secondary-medium  rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <p class="mb-2 text-sm">
                <span class="font-semibold">Click to upload</span>
              </p>
              <p class="text-xs">SVG, PNG, JPG (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>

        <div class="flex flex-col  justify-center w-full space-y-1">
          <p className="text-sm ml-1">Image Banner</p>
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-32 bg-neutral-secondary-medium  rounded-base cursor-pointer hover:bg-neutral-tertiary-medium"
          >
            <div class="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <p class="mb-2 text-sm">
                <span class="font-semibold">Click to upload</span>
              </p>
              <p class="text-xs">SVG, PNG, JPG (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" class="hidden" />
          </label>
        </div>

        {/* Title & Category */}
        <div className="space-y-1">
          <label className="ml-1 block text-sm font-medium">Nama Produk</label>
          <input
            type="text"
            required
            placeholder="Nama produk"
            className="w-full border rounded-xl px-2.5 py-3 text-sm"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div className="space-y-1">
          <label className="ml-1 block text-sm font-medium">Category</label>
          <select
            required
            className="w-full border rounded-xl px-2.5 py-3 text-sm"
            value={form.category_id}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          >
            <option value="">Pilih Category</option>
            {category?.data?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.category}
              </option>
            ))}
          </select>
        </div>

        {/* SKU */}
        <div className="flex gap-3">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium">Price</label>
            <input
              type="text"
              required
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium">Sell Price</label>
            <input
              type="text"
              required
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              value={form.sell_price}
              onChange={(e) => setForm({ ...form, sell_price: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium">Stock</label>
            <input
              type="text"
              required
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
            />
          </div>
          <div className="w-1/2 space-y-1">
            <label className="block text-sm font-medium">Weight (gram)</label>
            <input
              type="text"
              required
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              value={form.weight_gram}
              onChange={(e) =>
                setForm({ ...form, weight_gram: e.target.value })
              }
            />
          </div>
        </div>

        {/* Rich Text Fields */}
        <div className="space-y-1">
          <label className="block text-sm font-medium">Deskripsi</label>
          <RichTextEditor
            value={form.description}
            onChange={(val) => setForm({ ...form, description: val })}
          />
        </div>
       

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            type="submit"
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
    </>
  );
};
