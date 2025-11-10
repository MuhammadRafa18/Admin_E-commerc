import React, { useContext } from "react";

import { PagesContext } from "../Context/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Layouts } from "../Layouts/Layouts";

export const ParagrafAbout = () => {
  const { setParagrafAbout} = useContext(PagesContext);
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/paragrafabout`);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const HandleEdit = (id) => {
    navigate(`/FormParagrafAbout/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus data saya")) {
      try {
        await axios.delete(`${api}/paragrafabout/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("Hapus data gagal : ", err);
        alert("Hapus data gagal ");
      }
    }
  };
  console.log(Data);
  return (
    <Layouts>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setParagrafAbout({});
            navigate(`/FormParagrafAbout`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <div className="overflow-x-auto w-full hide-scrollbar">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className=" text-center px-6 py-3">
                  Image About
                </th>
                <th scope="col" className=" text-center px-6 py-3">
                  Paragraf About 1
                </th>
                <th scope="col" className=" text-center px-6 py-3">
                  Paragraf About 2
                </th>
                <th scope="col" className=" text-center px-6 py-3">
                  Paragraf About 3
                </th>
                <th scope="col" className=" text-center px-6 py-3">
                  Paragraf About 4
                </th>
                <th scope="col" className=" text-center px-6 py-3">
                  Paragraf About 5
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
                    <img src={`http://127.0.0.1:8000/storage/${item.imageabout}`} alt="" className="w-10 mx-auto" />
                  </td>
                  <td className="text-center px-6 py-4">{item.paragrafabout1}</td>
                  <td className="text-center px-6 py-4">{item.paragrafabout2}</td>
                  <td className="text-center px-6 py-4">{item.paragrafabout3}</td>
                  <td className="text-center px-6 py-4">{item.paragrafabout4}</td>
                  <td className="text-center px-6 py-4">{item.paragrafabout5}</td>
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
      </div>
    </Layouts>
  );
};
