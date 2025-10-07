import React, { useContext, useEffect, useState } from "react";
import { ParagrafAbout } from "../ParagrafAbout";
import { Link, useNavigate, useParams } from "react-router";
import { PagesContext } from "../../Context/PagesProvider";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormParagrafAbout = () => {
  const { ParagrafAbout, setParagrafAbout } = useContext(PagesContext);
  const [Image, setImage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/ParagrafAbout/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => setParagrafAbout(res.data));
      try {
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
  const HandleForm = async (e) => {
    e.preventDefault();
    const formdata = {
      id: ParagrafAbout.id || Date.now().toString(),
      gambar: Image || ParagrafAbout.gambar,
      paragraf1: ParagrafAbout.paragraf1 || "",
      paragraf2: ParagrafAbout.paragraf2 || "",
      paragraf3: ParagrafAbout.paragraf3 || "",
      paragraf4: ParagrafAbout.paragraf4 || "",
      paragraf5: ParagrafAbout.paragraf5 || "",
    };
    if (ParagrafAbout.id) {
      await axios.put(
        `http://localhost:5000/ParagrafAbout/${ParagrafAbout.id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(`http://localhost:5000/ParagrafAbout`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    navigate(`/ParagrafAbout`);
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ParagrafAbout">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{ParagrafAbout.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            {ParagrafAbout.id ? (
              <img src={ParagrafAbout.gambar} className="w-10" />
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
              value={ParagrafAbout.paragraf1 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragraf1: e.target.value,
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
              value={ParagrafAbout.paragraf2 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragraf2: e.target.value,
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
              value={ParagrafAbout.paragraf3 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragraf3: e.target.value,
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
              value={ParagrafAbout.paragraf4 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragraf4: e.target.value,
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
              value={ParagrafAbout.paragraf5 || ""}
              onChange={(e) =>
                setParagrafAbout({
                  ...ParagrafAbout,
                  paragraf5: e.target.value,
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
                ParagrafAbout.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {ParagrafAbout.id ? "Update" : "Save"}
            </button>
            {!ParagrafAbout.id && (
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
