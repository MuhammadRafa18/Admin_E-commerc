import React, { useContext } from "react";
import { ProdukContext } from "../Context/ProdukProvider";
import { Link, useNavigate } from "react-router";
import Prev from "../assets/panah.svg";


export const FormCity = () => {
  const { City, setCity, ListCity, setListCity } = useContext(ProdukContext);
  const {ListProvinci,setListProvinci} = useContext(ProdukContext)
   const navigate = useNavigate();
  const HandleForm = (e) => {
    e.preventDefault();
    if (City.id) {
      const update = ListCity.map((item) =>
        item.id === City.id
          ? {
              id: City.id,
              provinci: City.provinci,
              city: City.city,
            }
          : item
      );
      setListCity(update);
    } else {
      const data = {
        id: Date.now(),
        provinci: City.provinci,
        city: City.city,
      };
      setListCity([...ListCity, data]);
    }
    setCity({
      id: "",
      provinci: "",
      city: "",
    });

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
                {ListProvinci.map((item) => (
                    <option value={item.provinci} key={item.id}>{item.provinci}</option>
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
              onChange={(e) =>
                setCity({ ...City, city: e.target.value })
              }
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
  )
};
