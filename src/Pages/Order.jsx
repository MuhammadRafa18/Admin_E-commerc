import React, { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { UseFecth } from "../hooks/UseFecth";

export const Order = () => {
  const { Data, setData } = UseFecth("/admin/order");

  const [trackingNumbers, setTrackingNumbers] = useState({});

  const updateLocalData = (updatedOrder) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.id === updatedOrder.id ? updatedOrder : item
      ),
    }));
  };

  const handleAccept = async (id) => {
    try {
      const res = await axiosInstance.patch(`/admin/order/${id}`, {
        status: "Diproses",
      });

      updateLocalData(res.data.data);
      alert("Pesanan berhasil diproses");
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  const handleSendOrder = async (id) => {
    try {
      const trackingNumber = trackingNumbers[id];

      if (!trackingNumber) {
        return alert("Masukkan nomor resi");
      }

      const res = await axiosInstance.patch(`/admin/order/${id}`, {
        status: "Dikirim",
        trackingNumber,
      });

      updateLocalData(res.data.data);

      setTrackingNumbers((prev) => ({
        ...prev,
        [id]: "",
      }));

      alert("Pesanan berhasil dikirim");
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-4">
      {Data?.data?.map((order) => {
        const item = order.order_item?.[0];

        const isPending = order.status === "Pending";
        const isProcessed = order.status === "Diproses";
        const isShipped = order.status === "Dikirim";

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm p-4"
          >
            {/* HEADER */}
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-400">
                  {order.invoice_number}
                </p>

                <p className="text-xs text-gray-400">
                  {new Date(order.created_at).toLocaleDateString("id-ID")}
                </p>
              </div>

              <div
                className={`px-3 py-1 rounded-full text-xs
                ${
                  isPending
                    ? "bg-yellow-100 text-yellow-700"
                    : isProcessed
                    ? "bg-blue-100 text-blue-700"
                    : isShipped
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100"
                }`}
              >
                {order.status}
              </div>
            </div>

            {/* PRODUK */}
            <div className="flex gap-3 mt-4">
              <img
                src={`http://127.0.0.1:8000/storage/${item?.product_image}`}
                className="w-24 h-24 rounded-xl object-cover"
                alt=""
              />

              <div className="flex-1">
                <h2 className="font-semibold">
                  {item?.product_title}
                </h2>

                <p className="text-sm text-gray-500">
                  Size {item?.product_size}
                </p>

                <p className="mt-3 font-bold">
                  Rp {order.total.toLocaleString()}
                </p>

                <p className="text-sm text-gray-500">
                  {item?.qty} Barang
                </p>

                {order.trackingNumber && (
                  <div className="mt-2">
                    <span className="text-xs text-gray-500">
                      Resi
                    </span>

                    <p className="font-medium">
                      {order.trackingNumber}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ALAMAT */}
            <div className="bg-gray-100 rounded-xl p-3 mt-4">
              <p className="font-semibold">
                {order.shipping_name}
              </p>

              <p className="text-sm text-gray-500">
                {order.shipping_street},
                {" "}
                {order.shipping_city},
                {" "}
                {order.shipping_province}
              </p>
            </div>

            {/* ACTION */}
            <div className="mt-4">

              {isProcessed && (
                <div className="flex gap-2">
                  <input
                    className="flex-1 border rounded-lg px-3 py-2"
                    placeholder="Masukkan nomor resi"
                    value={trackingNumbers[order.id] || ""}
                    onChange={(e) =>
                      setTrackingNumbers((prev) => ({
                        ...prev,
                        [order.id]: e.target.value,
                      }))
                    }
                  />

                  <button
                    onClick={() => handleSendOrder(order.id)}
                    className="px-4 rounded-lg bg-black text-white"
                  >
                    Kirim
                  </button>
                </div>
              )}

              {isPending && (
                <button
                  onClick={() => handleAccept(order.id)}
                  className="w-full h-10 rounded-xl bg-black text-white mt-2"
                >
                  Terima Pesanan
                </button>
              )}

              {isShipped && (
                <button
                  disabled
                  className="w-full h-10 rounded-xl bg-green-600 text-white mt-2"
                >
                  Sedang Dikirim
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};