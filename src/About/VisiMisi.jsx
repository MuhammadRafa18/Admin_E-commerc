import React, { useContext } from "react";

import { PagesContext } from "../Context/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";


export const VisiMisi = () => {
  const { setVisiMisi } = useContext(PagesContext);
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/visimisi`);
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const HandleEdit = (id) => {
    navigate(`/FormVisiMisi/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus data ?")) {
      try {
        await axios.delete(`${api}/visimisi/${id}`, {
          headers: {
            Authorization: `Baerer ${token}`,
          },
        });
        alert("Data berhasil dihapus");
      } catch (err) {
        console.error("Hapus data gagal :", err);
        alert("Hapus data gagal ");
      }
    }
  };
  console.log(Data);
  return (
    <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
      <button
        onClick={() => {
          setVisiMisi({});
          navigate(`/FormVisiMisi`);
        }}
        className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
      >
        Tambah
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className=" text-center px-6 py-3">
              Image Visi Misi
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Visi Misi 1
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Visi Misi 2
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Visi Misi 3
            </th>
            <th scope="col" className=" text-center px-6 py-3">
              Visi Misi 4
            </th>
            <th scope="col" className=" text-center px-6 py-3">
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
                <td className="px-6 py-4 text-center">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.image}`}
                    alt=""
                    className="w-10 mx-auto"
                  />
                </td>
                <td className="text-center px-6 py-4">{item.visimisi1}</td>
                <td className="text-center px-6 py-4">{item.visimisi2}</td>
                <td className="text-center px-6 py-4">{item.visimisi3}</td>
                <td className="text-center px-6 py-4">{item.visimisi4}</td>
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
  );
};
