import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { PagesContext } from "../../Context/PagesProvider";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { UseFecth } from "../../hook/UseFecth";

export const FormVisiMisi = () => {
  const { VisiMisi, setVisiMisi } = useContext(PagesContext);
  const navigate = useNavigate();
  const api = import.meta.env.VITE_API;
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [Image, setImage] = useState(null);
  const { Data } = UseFecth(`${api}/visimisi`);
  const finData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (finData) {
      setVisiMisi(finData);
    }
  }, [id, finData]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
  };
  const HandleForm = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    Object.entries(VisiMisi).forEach(([key, value]) => {
      if(key === "image" ) return;
      formdata.append(key, value);
    });
    if (Image) formdata.append("image", Image);
    if (id) formdata.append("_method", "PUT");
    const url = id ? `${api}/visimisi/${id}` : `${api}/visimisi`;
    axios.post(url, formdata, {
      headers: {
        Authorization: `Baerer ${token}`,
      },
    });
    alert("Data berhasil disimpan");
    navigate(`/VisiMisi`);
  };
console.log(VisiMisi);
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/VisiMisi">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{VisiMisi.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            {VisiMisi.id ? (
              <img src={`http://127.0.0.1:8000/storage/${VisiMisi.image}`} className="w-10" />
            ) : null}
            <label
              htmlFor="ImageProduk"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Image Visi Misi
            </label>
            <input
              id="Image Visi Misi"
              type="file"
              className="w-full border rounded-xl px-2.5 py-3"
              required={!VisiMisi.id}
              onChange={(e) => handleFileChange(e)}
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf Visi Misi 1
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={VisiMisi.visimisi1 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  visimisi1: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf Visi Misi 2
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={VisiMisi.visimisi2 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  visimisi2: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf Visi Misi 3
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={VisiMisi.visimisi3 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  visimisi3: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">
              Paragraf Visi Misi 4
            </label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Paragraf"
              value={VisiMisi.visimisi4 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  visimisi4: e.target.value,
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
              {id ? "Update" : "Save"}
            </button>
            {!id && (
              <button
                onClick={() => setVisiMisi({})}
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
