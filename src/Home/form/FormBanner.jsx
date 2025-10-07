import React, { useContext, useEffect, useState } from "react";
import { PagesContext } from "../../Context/PagesProvider";
import Prev from"../../assets/panah.svg";
import { AuthContext } from "../../Context/AuthContext";
import { Link, useNavigate, useParams } from "react-router";
import axios from "axios";

export const FormBanner = () => {
  const { Banner, setBanner } = useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/Banner/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setBanner(res.data));
      } catch (err) {
        console.error("Data gagal req ; ", err);
      }
    }
  }, [id]);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // hasil base64
    };
    reader.readAsDataURL(file);
  };
  const HandleForm = async (e) => {
    e.preventDefault();
    const formdata = {
      id: Banner.id || Date.now().toString(),
      gambar: image || Banner.gambar,
    };
    if (Banner.id) {
      await axios.put(`http://localhost:5000/Banner/${Banner.id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`http://localhost:5000/Banner`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    navigate(`/Banner`);
  };

  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Banner">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Banner.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {Banner.id ? <img src={Banner.gambar} className="w-10" /> : null}
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
              required={!Banner.id}
              onChange={handleFileChange}
            />
          </div>
          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Banner.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Banner.id ? "Update" : "Save"}
            </button>
            {!Banner.id && (
              <button
                onClick={() => setBanner({})}
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
