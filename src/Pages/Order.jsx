import React, { useState } from "react";
import { UseFecth } from "../hooks/UseFecth";
import axios from "axios";
export const Order = () => {
  const { Data } = UseFecth(`/admin/order`);

  const handleStatusChange = async (item) => {
    let newStatus = item.status;

    if (item.status === "Pending" && confirm("Terima Pesanan ?")) {
      newStatus = "Dipersiapkan";
      const res = await axios.patch(`${api}/order/${item.id}`, {
        status: newStatus,
      });
      setData((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p.id === item.id ? res.data : p))
          : prev,
      );
      alert("Status berhasil diubah menjadi Dipersiapkan");
    } else if (item.status === "Dipersiapkan") {
      const inputResi = prompt("Masukkan nomor resi pengiriman:");
      if (!inputResi) return; // batal
      newStatus = "Dalam Pengiriman";
      const res = await axios.patch(`${api}/order/${item.id}`, {
        status: newStatus,
        trackingNumber: inputResi,
      });
      setData((prev) =>
        Array.isArray(prev)
          ? prev.map((p) => (p.id === item.id ? res.data : p))
          : prev,
      );
      alert("Status berhasil diubah menjadi Dalam Pengiriman");
      return;
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-4 space-y-3">
      {Data?.data?.map((order) => {
        const item = order.order_item?.[0];

        const isPending = order.status === "Pending";
        const isProcessed = order.status === "Diproses";
        const isShipped = order.status === "Dikirim";

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-sm p-3 sm:p-4"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs text-black/40">{order.invoice_number}</p>

                <p className="text-[11px] sm:text-xs text-black/40 mt-0.5">
                  {new Date(order.created_at).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>

              <div
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap
              ${
                isPending
                  ? "bg-yellow-100 text-yellow-700"
                  : isProcessed
                    ? "bg-blue-100 text-blue-700"
                    : isShipped
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
              }
            `}
              >
                {order.status}
              </div>
            </div>

            {/* PRODUCT */}
            <div className="flex gap-3 mt-4">
              <img
                src={`http://127.0.0.1:8000/storage/${item?.product_image}`}
                alt=""
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-xl flex-shrink-0"
              />

              <div className="flex-1 min-w-0">
                <h2 className="text-sm sm:text-[15px] font-medium line-clamp-2">
                  {item?.product_title}
                </h2>

                <p className="text-xs text-black/45 mt-1">
                  Size {item?.product_size}
                </p>

                <div className="flex items-center justify-between mt-3 gap-3">
                  <div>
                    <p className="text-sm font-semibold">
                      Rp {order.total.toLocaleString()}
                    </p>

                    <p className="text-[11px] text-black/40">
                      {item?.qty} barang
                    </p>
                  </div>

                  {order.trackingNumber && (
                    <div className="bg-black/5 px-2.5 py-1 rounded-lg max-w-[140px]">
                      <p className="text-[10px] text-black/40">Resi</p>

                      <p className="text-[11px] font-medium truncate">
                        {order.trackingNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="mt-4 bg-black/[0.03] rounded-xl p-3">
              <p className="text-xs font-medium">{order.shipping_name}</p>

              <p className="text-[11px] text-black/50 mt-1 line-clamp-2">
                {order.shipping_street}, {order.shipping_city},{" "}
                {order.shipping_province}
              </p>
            </div>

            {/* ACTION */}
            <div className="flex flex-col gap-3 mt-4">
              {/* INPUT RESI */}
              {isProcessed && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Input resi"
                    value={trackingNumbers[order.id] || ""}
                    onChange={(e) =>
                      setTrackingNumbers((prev) => ({
                        ...prev,
                        [order.id]: e.target.value,
                      }))
                    }
                    className="flex-1 h-10 px-3 rounded-xl bg-black/[0.04] outline-none text-sm"
                  />

                  <button
                    onClick={() => handleSendOrder(order.id)}
                    className="h-10 px-4 rounded-xl bg-black text-white text-sm font-medium"
                  >
                    Kirim
                  </button>
                </div>
              )}

              {/* BUTTON */}
              <div className="flex gap-2">
                {isPending && (
                  <>
                    <button
                      onClick={() => handleAccept(order.id)}
                      className="flex-1 h-10 rounded-xl bg-black text-white text-sm font-medium"
                    >
                      Terima
                    </button>

                    <button
                      onClick={() => handleReject(order.id)}
                      className="flex-1 h-10 rounded-xl bg-red-500 text-white text-sm font-medium"
                    >
                      Tolak
                    </button>
                  </>
                )}

                {isShipped && (
                  <button className="w-full h-10 rounded-xl bg-green-600 text-white text-sm font-medium">
                    Dalam Pengiriman
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
