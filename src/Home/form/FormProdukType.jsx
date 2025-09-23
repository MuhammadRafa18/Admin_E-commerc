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
  const { ProdukType, setProdukType} =
    useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { Data: Type } = UseFecth(`http://localhost:5000/Type`);
  const {token} = useContext(AuthContext)
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/ProdukType/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setProdukType(res.data));
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
      id: ProdukType.id || Date.now().toString(),
      gambar: image || ProdukType.gambar,
      type: ProdukType.type || "",
    };
    if (ProdukType.id) {
      await axios.put(
        `http://localhost:5000/ProdukType/${ProdukType.id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(`http://localhost:5000/ProdukType`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    navigate(`/ProdukType`);
  };

  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ProdukType">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{ProdukType.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {ProdukType.id ? (
            <img src={ProdukType.gambar} className="w-10" />
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
                  setProdukType({ ...ProdukType, type: e.target.value })
                }
                required
                value={ProdukType.type || ""}
              >
                <option value="">Select Type</option>
                {Type?.length > 0 &&
                  Type.map((item) => (
                    <option key={item.id} value={item.type}>
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
                ProdukType.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {ProdukType.id ? "Update" : "Save"}
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
