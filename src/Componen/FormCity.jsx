import React, { useContext, useEffect } from "react";
import { ProdukContext } from "../Context/ProdukProvider";
import { Link, useNavigate, useParams } from "react-router";
import Prev from "../assets/panah.svg";
import axios from "axios";
import { UseFecth } from "../hook/UseFecth";

export const FormCity = () => {
  const { City, setCity, ListCity, setListCity } = useContext(ProdukContext);
  const { ListProvinci, setListProvinci } = useContext(ProdukContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { Data : Provinci } = UseFecth(`http://localhost:5000/Provinci`)
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/City/${id}`)
          .then((res) => setCity(res.data));
      } catch (err) {
        console.error("Data gagal req :", err);
      }
    }
  }, [id]);
  const HandleForm = async (e) => {
    e.preventDefault();
    const mydata = {
      id: City.id || Date.now().toString(),
      provinci: City.provinci || "",
      city: City.city || "",
    };
    if (City.id) {
    await  axios.put(`http://localhost:5000/City/${City.id}`, mydata);
    } else {
     await axios.post(`http://localhost:5000/City`, mydata);
    }

    navigate(`/City`);
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Provinci">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{City.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}
          <select
            className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
            onChange={(e) => setCity({ ...City, provinci: e.target.value })}
            value={City.provinci || ""}
            required
          >
            <option value="">Pilih Type</option>
            {Provinci.map((item) => (
              <option value={item.provinci} key={item.id}>
                {item.provinci}
              </option>
            ))}
          </select>
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              City
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={City.city || ""}
              required
              onChange={(e) => setCity({ ...City, city: e.target.value })}
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                City.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {City.id ? "Update" : "Save"}
            </button>
            {!City.id && (
              <button
                onClick={() => setCity({})}
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
