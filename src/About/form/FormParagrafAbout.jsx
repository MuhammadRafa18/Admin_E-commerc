import React, { useContext, useEffect, useState } from "react";
import { ParagrafAbout } from "../ParagrafAbout";
import { Link, useNavigate, useParams } from "react-router";
import { PagesContext } from "../../Context/PagesProvider";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UseFecth } from "../../hook/UseFecth";

export const FormParagrafAbout = () => {
  const { ParagrafAbout, setParagrafAbout } = useContext(PagesContext);
  const [Image, setImage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/paragrafabout`);
  const finData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (finData) {
      setParagrafAbout(finData);
    }
  }, [id, finData]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
      setImage(file);
  };
  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(ParagrafAbout).forEach(([key, value]) => {
        if (key === "imageabout") return;
        formdata.append(key, value);
      });

      if (Image) formdata.append("imageabout", Image);
      if (id) formdata.append("_method", "PUT");
      const url = id ? `${api}/paragrafabout/${id}` : `${api}/paragrafabout`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },  
      });
      alert("Data berhasil disimpan");
      navigate(`/ParagrafAbout`);
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
          <Link to="/ParagrafAbout">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            {id ? (
              <img src={`http://127.0.0.1:8000/storage/${ParagrafAbout.imageabout}`}  className="w-10" />
            ) : null}
            <label
              htmlFor="ImageProduk"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Image About
            </label>
            <input
              id="Image About"
              type="file"
              className="w-full border rounded-xl px-2.5 py-3"
              required={!ParagrafAbout.id}
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf 1
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={ParagrafAbout.paragrafabout1 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragrafabout1: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf 2
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={ParagrafAbout.paragrafabout2 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragrafabout2: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf 3
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={ParagrafAbout.paragrafabout3 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragrafabout3: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf 4
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={ParagrafAbout.paragrafabout4 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragrafabout4: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf 5
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={ParagrafAbout.paragrafabout5 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragrafabout5: e.target.value,
                })
              }
              required
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
              {ParagrafAbout.id ? "Update" : "Save"}
            </button>
            {!id && (
              <button
                onClick={() => setParagrafAbout({})}
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
