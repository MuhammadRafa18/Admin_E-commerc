import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { PagesContext } from "../../Context/PagesProvider";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormVisiMisi = () => {
  const { VisiMisi, setVisiMisi } = useContext(PagesContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [Image, setImage] = useState(null);
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/VisiMisi/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setVisiMisi(res.data));
      } catch (err) {
        console.error("Data gagal req :", err);
      }
    }
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const HandleForm = (e) => {
    e.preventDefault();
    const formdata = {
      id: VisiMisi.id || Date.now().toString(),
      gambar: Image || VisiMisi.gambar,
      paragraf1: VisiMisi.paragraf1 || "",
      paragraf2: VisiMisi.paragraf2 || "",
      paragraf3: VisiMisi.paragraf3 || "",
      paragraf4: VisiMisi.paragraf4 || "",
    };
    if (VisiMisi.id) {
      axios.put(`http://localhost:5000/VisiMisi/${VisiMisi.id}`, formdata, {
        headers: {
          Authorization: `Baerer ${token}`,
        },
      });
    } else {
      axios.post(`http://localhost:5000/VisiMisi`, formdata, {
        headers: {
          Authorization: `Baerer ${token}`,
        },
      });
    }

    navigate(`/VisiMisi`);
  };

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
              <img src={VisiMisi.gambar} className="w-10" />
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
              value={VisiMisi.paragraf1 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  paragraf1: e.target.value,
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
              value={VisiMisi.paragraf2 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  paragraf2: e.target.value,
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
              value={VisiMisi.paragraf3 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  paragraf3: e.target.value,
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
              value={VisiMisi.paragraf4 || ""}
              onChange={(e) =>
                setVisiMisi({
                  ...VisiMisi,
                  paragraf4: e.target.value,
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
                VisiMisi.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {VisiMisi.id ? "Update" : "Save"}
            </button>
            {!VisiMisi.id && (
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
