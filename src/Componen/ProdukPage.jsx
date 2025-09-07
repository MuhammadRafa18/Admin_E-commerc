import React, { useContext } from "react";
import { AdminLayout } from "./AdminLayout";
import { useNavigate } from "react-router-dom";
import { ProdukContext } from "../Context/ProdukProvider";

export const ProdukPage = () => {
  const { ListProduk, setListProduk , setProduk  } = useContext(ProdukContext);
  const navigate = useNavigate();

  const HandleUpdate = (id) => {
     const UpdateProduk = ListProduk.find((item) => item.id === id )
     setProduk(UpdateProduk)
     navigate(`/FormProduk`)
  }

  const HandleDelete = (id) => {
    if(confirm("Hapus Data?")){
      const UpadateList = ListProduk.filter((item) => item.id !== id) 
      setListProduk(UpadateList)
    }
  }

  return (
    <AdminLayout>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => { setProduk({}); navigate(`/FormProduk`); }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Gambar
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Nama
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Type
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Category
              </th>
              <th scope="col" className="text-center px-6 py-3">
                size
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

        
            {ListProduk.map((item) => (
            <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
              <td className="flex justify-center items-center">
                <img src={item.gambar} alt="" className="w-10" />
              </td>
              <td className="text-center px-6 py-4">{item.name}</td>
              <td className="text-center px-6 py-4">{item.type}</td>
              <td className="text-center px-6 py-4">{item.category}</td>
              <td className="text-center px-6 py-4">{item.size}</td>
              <td className="text-center px-6 py-4">{item.price}</td>
              <td className="text-center px-6 py-4">{item.rating}</td>
              <td className="text-center px-6 py-4">{item.stok}</td>
              <td className="text-center px-6 py-4 space-x-2">
                <button onClick={() => HandleUpdate(item.id) } className="bg-green-500 text-white p-2 rounded-xl cursor-pointer">
                  Edit
                </button>
                <button onClick={() => HandleDelete(item.id) } className="bg-red-500 text-white p-2 rounded-xl cursor-pointer">
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
