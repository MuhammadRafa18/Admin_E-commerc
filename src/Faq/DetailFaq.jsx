import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { UseFecth } from '../hook/UseFecth';
import { AuthContext } from '../Context/AuthContext';
import { ProdukContext } from '../Context/ProdukProvider';
import axios from 'axios';
import { Layouts } from '../Layouts/Layouts';

export const DetailFaq = () => {
   const navigate = useNavigate();
   const {setDetailFaq} = useContext(ProdukContext)
   const api = import.meta.env.VITE_API;
    const { Data } = UseFecth(`${api}/detailfaq`);
    const { token } = useContext(AuthContext);
    const HandleEdit = (id) => {
      navigate(`/FormDetailFaq/${id}`);
    };
    const HandleDelete = async (id) => {
      if (confirm("Hapus data ?")) {
        try {
          await axios.delete(`${api}/detailfaq/${id}`, {
            headers: {
              Authorization: `$Bearer ${token}`,
            },
          });
          alert("Hapus data sukses")
        } catch (err) {
          console.error("Hapu data gagal :", err);
          alert("hapus data gagal");
        }
      }
    };
    console.log(Data.data)
    return (
      <Layouts>
        <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
          <button
            onClick={() => {
              setDetailFaq({});
              navigate(`/FormDetailFaq`);
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
                  Faq
                </th>
                <th scope="col" className="text-center px-6 py-3">
                  Detail Faq
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
                  <td className="text-center px-6 py-4">{item.faq.judul}</td>
                  <td className="text-center px-6 py-4">{item.quest}</td>
                  <td className="text-center px-6 py-4">{item.answer}</td>
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
}
