import { useNavigate } from "react-router";
import axiosInstance from "../services/axiosInstance";
import toast, { Toaster } from 'react-hot-toast';

export const UseAction = () => {
  const navigate = useNavigate();
  const handleSubmit = async ({
    endpoint,
    data,
    files = {},
    variants = [],
    skin_types = [],
    id = null,
   
  }) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value ?? "");
      });

      Object.entries(skin_types).forEach(([key, arr]) => {
        arr.forEach((item) => {
          formData.append(
            `${key}[]`,
            typeof item === "object" ? item.id : item,
          );
        });
      });

      if (Array.isArray(variants) && variants.length > 0) {
        variants.forEach((variant, index) => {
          if (variant.id) formData.append(`variants[${index}][id]`, variant.id);
          formData.append(`variants[${index}][size]`, variant.size ?? "");
          formData.append(`variants[${index}][color]`, variant.color ?? "");
        });
      }

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

      toast.success(id ? "Data Successfully to update" : "Data Successfully to save");
    } catch (err) {
      toast.error("Failed to Created")
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
        toast.success('Successfully Delete!');
      } catch (err) {
        toast.error("Failed to Delete")
        alert(err.message);
      }
    }
  };
  const HandleToggle = async (
    endpoint,
    id,
    currentStatus,
    setData,
  ) => {
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
      toast.success('Successfully Update Status!');
    } catch (err) {
      toast.error("Failed to Update Status")
      setData((prev) => ({
        ...prev,
        data: prev.data.map((item) =>
          item.id === id ? { ...item, is_active: currentStatus } : item,
        ),
      }));
      
    }
  };
  return { HandleUpdate, HandleDelete, HandleToggle, handleSubmit };
};
