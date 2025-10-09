import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProdukContext } from "../Context/ProdukProvider";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Layouts } from "../Layouts/Layouts";

export const ProdukPage = () => {
  const { ListProduk, setListProduk, setProduk } = useContext(ProdukContext);
  const navigate = useNavigate();
  const url = `http://localhost:5000/produk`;
  const { Data } = UseFecth(url);
  const { token } = useContext(AuthContext);
  const HandleUpdate = (id) => {
    navigate(`/FormProduk/${id}`);
  };

  const HandleDelete = async (id) => {
    if (confirm("Hapus Data?")) {
      try {
        await axios.delete(`http://localhost:5000/produk/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
      } catch {
        console.error("Gagal hapus produk:", err);
        alert("Gagal hapus produk ❌");
      }
    }
  };
  console.log(Data);
  return (
    <Layouts>
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
        <div className="overflow-x-auto w-full hide-scrollbar">
        <table className="min-w-max text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className=" text-center px-6 py-3">
                No
              </th>
              <th scope="col" className=" text-center px-6 py-3">
                Gambar Produk
              </th>
               <th scope="col" className=" text-center px-6 py-3">
                Gambar Banner
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nama
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Category
              </th>
              <th scope="col" className="text-center px-6 py-3">
                type
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Type Produk
              </th>
              <th scope="col" className="text-center px-6 py-3">
                price
              </th>
              <th scope="col" className="text-center px-6 py-3">
                size
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Rating
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Stok
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Deskripsi
              </th>
              <th scope="col" className="text-center px-6 py-3">
                How To Use
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Ingredient
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Data?.length > 0 &&
              Data.map((item,index) => (
                <tr
                  key={item.id}
                  className=" bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                > 
                <td className="text-center px-6 py-4">
                  {index + 1}
                </td>
                  <td  className="px-6 py-4 text-center">
                    <img src={item.imageproduk} alt="" className="w-10 mx-auto" />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <img src={item.imagebanner} alt="" className="w-10 mx-auto" />
                  </td>
                  <td className="text-center px-6 py-4">{item.title}</td>
                  <td className="text-center px-6 py-4">{item.category}</td>
                  <td className="text-center px-6 py-4">{item.type}</td>
                  <td className="text-center px-6 py-4">{item.typeProduk}</td>
                  <td className="text-center px-6 py-4">{item.price}</td>
                  <td className="text-center px-6 py-4">{item.size}</td>
                  <td className="text-center px-6 py-4">{item.rating}</td>
                  <td className="text-center px-6 py-4">{item.stok}</td>
                  <td className="w-80 text-center px-6 py-4 ">{item.description}</td>
                  <td className="w-80 text-center px-6 py-4 ">{item.useproduk}</td>
                  <td className="w-80 text-center px-6 py-4">{item.ingredient}</td>
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
      </div>
    </Layouts>
  );
};
