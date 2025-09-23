import React, { useContext, useEffect, useState } from "react";
import { PagesContext } from "../../Context/PagesProvider";
import { Link, useNavigate, useParams } from "react-router";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormPower = () => {
  const { ListPower, setListPower, Power, setPower } = useContext(PagesContext);
  const [image, setimage] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/Power/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => setPower(res.data));
      } catch (err) {
        console.error("Data Gagal req :", err);
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
      id: Power.id || Date.now().toString(),
      icon: image || Power.icon,
      benefit: Power.benefit || "",
    };
    if (Power.id) {
      await axios.put(`http://localhost:5000/Power/${Power.id}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`http://localhost:5000/Power`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    navigate(`/Power`);
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ProdukType">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Power.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          {Power.id ? <img src={Power.icon} className="w-10" /> : null}
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
              value={Power.benefit || ""}
              onChange={(e) => setPower({ ...Power, benefit: e.target.value })}
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
