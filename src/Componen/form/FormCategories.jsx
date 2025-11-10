import React, { useContext, useEffect, useState } from "react";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Context/ProdukProvider";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UseFecth } from "../../hook/UseFecth";
export const FormCategories = () => {
  const navigate = useNavigate();
  const { Categories, setCategories } = useContext(ProdukContext);
  const { token } = useContext(AuthContext);
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/category`);
  const { id } = useParams();
  const findData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (id) {
      setCategories(findData);
    }
  }, [id, findData]);

  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(Categories).forEach(([keys, value]) => {
        formdata.append(keys, value);
      });

      if (id) formdata.append("_method", "PUT");

      const url = id ? `${api}/category/${id}` : `${api}/category`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
      alert("Add Data sukses");
      navigate(`/Categories`);
    } catch (err) {
      console.error("Messages : ", err);
      alert("Data Gagal disimpan");
    }
  };
  console.log(Data)
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Categories">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}

          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Category
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={Categories?.category || ""}
              required
              onChange={(e) =>
                setCategories({ ...Categories, category: e.target.value })
              }
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {id ? "Update" : "Save"}
            </button>
            {!id && (
              <button
                onClick={() => setCategories({})}
                type="reset"
                className="border border-black px-6 py-2 rounded-full  w-1/2 cursor-pointer"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};
