import React, { useContext } from "react";
import { AdminLayout } from "./AdminLayout";
import { ProdukContext } from "../Context/ProdukProvider";
import { useNavigate } from "react-router";

export const Provinci = () => {
  const { Provinci, setProvinci, ListProvinci, setListProvinci } =
    useContext(ProdukContext);
  const navigate = useNavigate();
  const HandleEdit = (id) => {
    const edit = ListProvinci.find((item) => item.id === id);
    setProvinci(edit);
    navigate(`/FormProvinci`);
  };
  const HandleDelete = (id) => {
    const destroy = ListProvinci.filter((item) => item.id !== id);
    setListProvinci(destroy);
  };
  return ( 
  <AdminLayout>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setProvinci({});
            navigate(`/FormProvinci`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Provinci
              </th>
              <th scope="col" className=" text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {ListProvinci.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="text-center px-6 py-4">{item.provinci}</td>
                <td className="text-center px-6 py-4 space-x-3">
                  <button
                    onClick={() => HandleEdit(item.id)}
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
  )
};
