import { useNavigate } from "react-router";
import axiosInstance from "../services/axiosInstance";

export const UseAction = () => {
  const navigate = useNavigate();
  const handleSubmit = async ({
    endpoint,
    data,
    files = {},
    id = null,
    onSuccess,
  }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      Object.entries(files).forEach(([key, file]) => {
        if (file) formData.append(key, file);
      });

    
      if (id) formData.append("_method", "PUT");

      const url = id ? `${endpoint}/${id}` : endpoint;

      await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error submit:", err);
      alert("Gagal menyimpan data");
    }
  };

  const HandleUpdate = (path, id) => {
    navigate(`/${path}/${id}`);
  };

  const HandleDelete = async (endpoint, id) => {
    if (confirm("Hapus Data?")) {
      try {
        await axiosInstance.delete(`${endpoint}/${id}`);
        alert("Data Berhasil Dihapus");
      } catch (err) {
        console.error("Gagal hapus produk:", err);
        alert("Gagal hapus produk ");
      }
    }
  };
  const HandleToggle = async (
    endpoint,
    id,
    currentStatus,
    setData,
    onError,
  ) => {
    // Optimistic update dulu
    setData((prev) => ({
      ...prev,
      data: prev?.data?.map((item) =>
        item.id === id ? { ...item, is_active: !currentStatus } : item,
      ),
    }));

    try {
      await axiosInstance.patch(`${endpoint}/${id}`, {
        is_active: !currentStatus,
      });
    } catch (err) {
      console.error("Gagal update status:", err);

      // Rollback kalau gagal
      setData((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.id === id ? { ...item, is_active: currentStatus } : item,
        ),
      }));

      onError?.();
    }
  };
  return { HandleUpdate, HandleDelete, HandleToggle, handleSubmit };
};
