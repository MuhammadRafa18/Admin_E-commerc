import React, { useContext } from "react";
import { AdminLayout } from "../Componen/AdminLayout";
import { PagesContext } from "../Context/PagesProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export const ParagrafAbout = () => {
  const {
    ListParagrafAbout,
    setListParagrafAbout,
    ParagrafAbout,
    setParagrafAbout,
  } = useContext(PagesContext);
  const {Data} = UseFecth(`http://localhost:5000/ParagrafAbout`)
    const { token } = useContext (AuthContext) 
  const navigate = useNavigate();
  const HandleEdit = (id) => {
    navigate(`/FormParagrafAbout/${id}`);
  };
  const HandleDelete = async (id) => {
    if(confirm("Hapus data saya")){
      try{
      await axios.delete(`http://localhost:5000/ParagrafAbout/${id}`,{
          headers: {
              Authorization: `Bearer ${token}`
            }
      })
      }catch (err){
        console.error("Hapus data gagal : ",err)
        alert("Hapus data gagal ")
      }
    }
  };
 
  return (
    <AdminLayout>
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
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Paragraf About
              </th>
              <th scope="col" className=" text-center px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.map((item) => (
              <tr
                key={item.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
              >
                <td className="text-center px-6 py-4">{item.paragraf}</td>
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
  );
};
