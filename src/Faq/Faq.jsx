import React, { useContext } from "react";
import { PagesContext } from "../Context/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Layouts } from "../Layouts/Layouts";

export const Faq = () => {
  const { setFaq} = useContext(PagesContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/faq`);
  const { token } = useContext(AuthContext);
  const HandleEdit = (id) => {
    navigate(`/FormFaq/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus data ?")) {
      try {
        await axios.delete(`${api}/faq/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert('Data berhasil dihapus');
      } catch (err) {
        console.error("Hapu data gagal :", err);
        alert("hapus data gagal");
      }
    }
  };
  return (
    <Layouts>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setFaq({});
            navigate(`/FormFaq`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="text-center px-6 py-3">
                Judul
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
                <td className="text-center px-6 py-4">{item.judul}</td>
                <td className="text-center px-6 py-4">{item.quest1}</td>
                <td className="text-center px-6 py-4">{item.quest2}</td>
                <td className="text-center px-6 py-4">{item.quest3}</td>
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
