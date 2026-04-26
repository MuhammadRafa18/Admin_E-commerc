import React, { useState } from "react";
import { UseAction } from "../hooks/UseAction";
import { InputText } from "../Component/InputText";
import { InputImage } from "../Component/InputImage";
import { InputSelect } from "../Component/InputSelect";

export const FormUserAdmin = ({ data, onSuccess, onClose }) => {
  const [user, setUser] = useState({
    email: data?.email ?? "",
    name: data?.name ?? "",
    role: data?.role ?? "",
    password: "",
  });
  const [files, setFiles] = useState({
    image: null,
  });
  const { handleSubmit, loading } = UseAction();
  const set = (key) => (e) => setUser({ ...user, [key]: e.target?.value ?? e });
  const Option = [
    { value: "admin", label: "Admin" },
    { value: "super_admin", label: "Super Admin" },
  ];
  const HandleForm = async (e) => {
    e.preventDefault();
    const changed = {};
    if (user.email !== data?.email) changed.email = user.email;
    if (user.name !== data?.name) changed.name = user.name;
    if (user.role !== data?.role) changed.role = user.role;
    if (user.password) changed.password = user.password;
    await handleSubmit({
      endpoint: "/admin/UserAdmin",
      data: changed,
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
        label="Image"
        id="image"
        onChange={(file) => {
          setFiles({ ...files, image: file });
        }}
      />
      <InputSelect
        label="Role"
        value={user.role}
        options={Option}
        placeholder="Pilih Role"
        required
        onChange={(val, selected) =>
          setUser((prev) => ({
            ...prev,
            role: selected?.value ?? "",
          }))
        }
      />
      <InputText
        label="Email"
        value={user.email}
        onChange={set("email")}
        required
      />
      <InputText
        label="Password"
        value={user.password}
        onChange={set("password")}
        required={!data}
        placeholder={data ? "Kosongkan jika tidak ingin mengubah" : "Password"}
      />
      <InputText
        label="Name"
        value={user.name}
        onChange={set("name")}
        required
      />

      <div className="flex gap-3 pt-2 ">
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
