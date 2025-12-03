import React, { useContext } from "react";
import { PagesContext } from "../Context/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";

export const Banner = () => {
  const { setBanner } = useContext(PagesContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/banner`);
  const { token } = useContext(AuthContext);
  const HandleEdit = (id) => {
    navigate(`/FormBanner/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus Data ?")) {
      try {
        axios.delete(`${api}/banner/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("Data Berhasil Di hapus");
      } catch (err) {
        console.error("Data gagal dihapus :", err);
      }
    }
  };
  console.log(Data.data);
  return (
    <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
      <button
        onClick={() => {
          setBanner({});
          navigate(`/FormBanner`);
        }}
        className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
      >
        Tambah
      </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className=" text-center px-6 py-3">
              image
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
                <td className="flex justify-center items-center">
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.banner}`}
                    alt=""
                    className="w-10"
                  />
                </td>
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
