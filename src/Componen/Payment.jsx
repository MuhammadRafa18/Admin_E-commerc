import React, { useContext } from "react";
import { AdminLayout } from "./AdminLayout";
import { ProdukContext } from "../Context/ProdukProvider";
import { useNavigate } from "react-router";
import { UseFecth } from "../hook/UseFecth";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

export const Payment = () => {
  const { Payment, setPayment, ListPayment, setListPayment } =
    useContext(ProdukContext);
  const url = `http://localhost:5000/Payment`;
  const { Data } = UseFecth(url);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const HandleEdit = (id) => {
    navigate(`/FormPayment/${id}`);
  };
  const HandleDelete = async (id) => {
    if (confirm("Hapus Data ? ")) {
      try {
        await axios.delete(`http://localhost:5000/Payment/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert("Hapus Data berhasil");
      } catch (err) {
        console.error("Data gagal : ", err);
        alert("Data Gagal dihapus");
      }
    }
  };
  return (
    <AdminLayout>
      <div className="flex flex-col items-end space-y-2 py-8 relative overflow-x-auto  ">
        <button
          onClick={() => {
            setPayment({});
            navigate(`/FormPayment`);
          }}
          className="w-fit bg-green-500 text-white py-2 px-5 rounded-xl cursor-pointer "
        >
          Tambah
        </button>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className=" text-center px-6 py-3">
                Payment
              </th>
              <th scope="col" className=" text-center px-6 py-3">
                Icon
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
                <td className="flex justify-center items-center">
                  <img src={item.icon} alt="" className="w-10" />
                </td>
                <td className="text-center px-6 py-4">{item.payment}</td>
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
