import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProdukContext } from "../Context/ProdukProvider";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Layouts } from "../Layouts/Layouts";

export const UserAdmin = () => {
  const { setUser } = useContext(ProdukContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/UserAdmin`);
  const { token } = useContext(AuthContext);
  const HandleEdit = (id) => {
    navigate(`/FormUserAdmin/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus data ?")) {
      try {
        await axios.delete(`${api}/UserAdmin/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert("Data Sukses delete");
      } catch (err) {
        console.error("Data gagal dihapus", err);
        alert("Data gagal dihapus");
      }
    }
  };

  return (
    <Layouts>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setUser({});
            navigate(`/FormUserAdmin`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Email
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Role
              </th>
              <th scope="col" className="text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Data?.data?.length > 0 &&
            Data.data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="text-center px-6 py-4">{item.email}</td>
                <td className="text-center px-6 py-4">{item.role}</td>
                <td className="text-center px-6 py-4 space-x-2">
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
    </Layouts>
  );
};
