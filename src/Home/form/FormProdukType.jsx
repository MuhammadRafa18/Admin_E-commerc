import React, { useContext, useEffect, useState } from "react";
import { PagesContext } from "../../Context/PagesProvider";
import { Link, useNavigate, useParams } from "react-router";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import { ProdukContext } from "../../Context/ProdukProvider";
import axios from "axios";
import { UseFecth } from "../../hook/UseFecth";
import { AuthContext } from "../../Context/AuthContext";

export const FormProdukType = () => {
  const { ProdukType, setProdukType } = useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const api = import.meta.env.VITE_API;
  const { Data: Type } = UseFecth(`${api}/type`);
  const { Data } = UseFecth(`${api}/ProdukType`);
  const { token } = useContext(AuthContext);
  const finData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (finData) {
      setProdukType({ ...finData, type_id: finData.type.id });
    }
  }, [id, finData]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setimage(file);
  };
  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(ProdukType).forEach(([key, value]) => {
        if(key === "image") return;
        formdata.append(key, value);
      });

      if (image) formdata.append("image", image );

      if (id) formdata.append("_method", "PUT");
      const url = id ? `${api}/ProdukType/${id}` : `${api}/ProdukType`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("data berhasil disimpan");
      navigate(`/ProdukType`);
    } catch (err) {
      console.error("messages :", err);
      alert("Data gagal disimpan");
    }
  };
  console.log(ProdukType);
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ProdukType">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {id ? (
            <img
              src={`http://127.0.0.1:8000/storage/${ProdukType.image}`}
              className="w-10"
            />
          ) : null}
          <div>
            <label
              htmlFor="gambar"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Image
            </label>
            <input
              id="gambar"
              type="file"
              className="w-full border rounded-xl px-2.5 py-3"
              required={!ProdukType.id}
              onChange={handleFileChange}
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-base block">Type</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={(e) =>
                  setProdukType({ ...ProdukType, type_id: e.target.value })
                }
                required
                value={ProdukType?.type_id || ""}
              >
                <option value="">Select Type</option>
                {Type?.data?.length > 0 &&
                  Type.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.type}
                    </option>
                  ))}
              </select>
            </div>
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
            {!ProdukType.id && (
              <button
                onClick={() => setProdukType({})}
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
