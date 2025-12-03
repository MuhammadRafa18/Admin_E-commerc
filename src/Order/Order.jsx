import React, { useState } from "react";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
export const Order = () => {
  const api = import.meta.env.VITE_API;
  const { Data, setData } = UseFecth(`${api}/order`);

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
          : prev
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
          : prev
      );
      alert("Status berhasil diubah menjadi Dalam Pengiriman");
      return;
    }
  };
  const HandleDelete = async (id) => {
    if (confirm("Tolak Pesanan ?")) {
      try {
        axios.delete(`${api}/order/${id}`, {});
        alert("Pesanan berhasil dihapus");
      } catch (err) {
        console.error("Pesanan gagal ditolak :", err);
      }
    }
  };
  console.log(Data?.data);
  return (
    <div className="flex space-x-3">
      {Data?.data?.length > 0 &&
        Data.data.map((item) => {
          const subtotal = item.produk.price * item.qty;
          const total = subtotal - item.diskon - item.ongkir;
          return (
            <div
              key={item.id}
              className="w-fit p-6 bg-white rounded-lg space-y-4 shadow"
            >
              <div className="flex content-between ">
                <div className="flex space-x-3">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.produk.imagebanner}`}
                    alt=""
                    className="w-40"
                  />
                  <div className="w-52 space-y-2">
                    <p className="text-sm ">{item.produk.title}</p>
                    <p className="text-xs text-black/50">{item.produk.size}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm ">
                        Rp {item.produk.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-black/50">x {item.qty}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-3">
                <p className="text-base font-semibold mb-2">Order Summary</p>
                <div className="text-sm space-y-1">
                  <p>Subtotal: Rp {subtotal.toLocaleString()}</p>
                  <p>Diskon: Rp {item.diskon.toLocaleString()}</p>
                  <p>Ongkir: Rp {item.ongkir.toLocaleString()}</p>
                  <p className="font-semibold border-t pt-2">
                    Total: Rp {total.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">
                  Status: <span className="font-semibold">{item.status}</span>
                </p>
                {item.trackingNumber && (
                  <p className="text-sm text-gray-600">
                    Resi:{" "}
                    <span className="font-semibold">{item.trackingNumber}</span>
                  </p>
                )}
                <p className="text-sm text-gray-600">
                  Alamat: {item.addres.streetname}, {item.addres.city}{" "}
                  {item.addres.provinci}
                </p>
                <p className="text-sm text-gray-600">
                  Penerima: {item.addres.fullname}
                </p>
              </div>

              {/* Tombol dinamis */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleStatusChange(item)}
                  className="bg-amber-600 hover:bg-amber-700 text-white text-sm px-2 py-1.5 rounded"
                >
                  {item.status === "Pending"
                    ? "Terima Pesanan"
                    : item.status === "Dipersiapkan"
                    ? "Kirim Pesanan"
                    : "Pesanan Dalam Pengiriman"}
                </button>
                <button
                  onClick={() => HandleDelete(item.id)}
                  className="bg-red-500  text-white text-sm px-2 py-1.5 rounded"
                >
                  Tolak Pesanan
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};
