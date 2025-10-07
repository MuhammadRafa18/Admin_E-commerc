import React, { useState } from "react";

import { UseFecth } from "../hook/UseFecth";
import ImageProduct from "../assets/ProdukDetail.png";
import { Layouts } from "../Layouts/Layouts";
import axios from "axios";
export const Order = () => {
  const { Data, setData } = UseFecth(`http://localhost:5000/Order`);

  const handleStatusChange = async (item) => {
    let newStatus = item.status;

    if (item.status === "Pending" && confirm("Terima Pesanan ?")) {
      newStatus = "Dipersiapkan";
      await axios.patch(`http://localhost:5000/Order/${item.id}`, {
        status: newStatus,
      });
    } else if (item.status === "Dipersiapkan") {
      const inputResi = prompt("Masukkan nomor resi pengiriman:");
      if (!inputResi) return; // batal
      newStatus = "Dalam Pengiriman";
      await axios.patch(`http://localhost:5000/Order/${item.id}`, {
        status: newStatus,
        trackingNumber: inputResi,
      });

      return;
    }
  };
  const HandleDelete = async (id) => {
    if (confirm("Tolak Pesanan ?")) {
      try {
        axios.delete(`http://localhost:5000/Order/${id}`, {});
      } catch (err) {
        console.error("Pesanan gagal ditolak :", err);
      }
    }
  };
  console.log(Data);
  return (
    <Layouts>
      <div className="flex space-x-3">
        {Data.map((item) => {
          const subtotal = item.items[0]?.price * item.items[0]?.qty;
          const total = subtotal - item.diskon - item.ongkir;
          return (
            <div
              key={item.id}
              className="w-fit p-6 bg-white rounded-lg space-y-4 shadow"
            >
              <div className="flex content-between ">
                {item.items.map((product, i) => (
                  <div key={i} className="flex space-x-3">
                    <img src={ImageProduct} alt="" className="w-40" />
                    <div className="w-52 space-y-2">
                      <p className="text-sm ">{product.title}</p>
                      <p className="text-xs text-black/50">{product.size}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm ">
                          Rp {product.price.toLocaleString()}
                        </p>
                        <p className="text-xs text-black/50">x {product.qty}</p>
                      </div>
                    </div>
                  </div>
                ))}
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
                  Alamat: {item.shippingAddress}
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
    </Layouts>
  );
};
