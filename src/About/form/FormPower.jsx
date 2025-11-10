import React, { useContext, useEffect, useState } from "react";
import { PagesContext } from "../../Context/PagesProvider";
import { Link, useNavigate, useParams } from "react-router";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UseFecth } from "../../hook/UseFecth";

export const FormPower = () => {
  const { Power, setPower } = useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/power`);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const finData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (finData) {
      setPower(finData);
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
      Object.entries(Power).forEach(([keys, value]) => {
        if (keys === "icon") return;
        formdata.append(keys, value);
      });

      if (image) formdata.append("icon", image);
      if (id) formdata.append("_method", "put");
      const url = id ? `${api}/power/${id}` : `${api}/power`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Data berhasil disimpan");
      navigate(`/Power`);
    } catch (err) {
      console.error("messages : ", err);
      alert("Data gagal disimpan");
    }
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Power">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Power.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {id ? <img src={`http://127.0.0.1:8000/storage/${Power.icon}`} className="w-10" /> : null}
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
              required={!Power.id}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">Benefit</label>
            <input
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Name"
              value={Power.power || ""}
              onChange={(e) => setPower({ ...Power, power: e.target.value })}
              required
            />
          </div>
          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Power.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Power.id ? "Update" : "Save"}
            </button>
            {!Power.id && (
              <button
                onClick={() => setPower({})}
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
