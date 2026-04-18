import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AuthContext } from "../../Store/AuthContext";
import axios from "axios";
import Prev from "../../assets/panah.svg";
import { PagesContext } from "../../Store/PagesProvider";
import { UseFecth } from "../../hooks/UseFecth";

export const FormResult = () => {
  const { Result, setResult } = useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/result`);
  const finData = Data?.data?.find((item) => item.id === Number(id));

  useEffect(() => {
    if (finData) {
      setResult(finData);
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
      if (image) formdata.append("result", image || null);
      if (Result.id) formdata.append("_method", "PUT");
      const url = id ? `${api}/result/${id}` : `${api}/result`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data berhasil disimpan");
      navigate(`/result`);
    } catch (err) {
      console.error("messages :", err);
      alert("Data gagal disimpan");
    }
  };

  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Result">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {id ? (
            <img
              src={`http://127.0.0.1:8000/storage/${Result.result}`}
              className="w-10"
            />
          ) : null}
          <div>
            <label
              htmlFor="gambar"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Result
            </label>
            <input
              id="gambar"
              type="file"
              className="w-full border rounded-xl px-2.5 py-3"
              required={!Result.id}
              onChange={handleFileChange}
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
                onClick={() => setResult({})}
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
