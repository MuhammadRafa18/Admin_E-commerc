import React, { useContext } from "react";
import { AdminLayout } from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { ProdukContext } from "../Context/ProdukProvider";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";

export const ProdukPage = () => {
  const { ListProduk, setListProduk, setProduk } = useContext(ProdukContext);
  const navigate = useNavigate();
  const url = `https://dummyjson.com/products`;
  const { Products } = UseFecth(url);
  const HandleUpdate = (id) => {
    navigate(`/FormProduk/${id}`);
  };

  const HandleDelete = async (id) => {
    if (confirm("Hapus Data?")) {
      try {
        await axios.delete(`http://localhost:3000/produk/${id}`);
      } catch {
        console.error("Gagal hapus produk:", err);
        alert("Gagal hapus produk ❌");
      }
    }
  };
  console.log(Products);
  return (
    <AdminLayout>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setProduk({});
            navigate(`/FormProduk`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Gambar
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nama
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Category
              </th>
              <th scope="col" className="text-center px-6 py-3">
                discount
              </th>
              <th scope="col" className="text-center px-6 py-3">
                price
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Rating
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Stok
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Products?.length > 0 &&
              Products.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <td className="flex justify-center items-center">
                    <img src={item.images[0]} alt="" className="w-10" />
                  </td>
                  <td className="text-center px-6 py-4">{item.title}</td>
                  <td className="text-center px-6 py-4">{item.category}</td>
                  <td className="text-center px-6 py-4">
                    {item.discountPercentage}
                  </td>
                  <td className="text-center px-6 py-4">{item.price}</td>
                  <td className="text-center px-6 py-4">{item.rating}</td>
                  <td className="text-center px-6 py-4">{item.stock}</td>
                  <td className="text-center px-6 py-4 space-x-2">
                    <button
                      onClick={() => HandleUpdate(item.id)}
                      className="bg-green-500 text-white p-2 rounded-xl cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => HandleDelete(item.id)}
                      className="bg-red-500 text-white p-2 rounded-xl cursor-pointer"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};
