import React, { useContext } from "react";
import { ProdukContext } from "../Context/ProdukProvider";
import { Link, useNavigate } from "react-router";
import Prev from "../assets/panah.svg";

export const FormProvinci = () => {
  const { Provinci, setProvinci, ListProvinci, setListProvinci } =
    useContext(ProdukContext);
    const navigate = useNavigate();
  const HandleForm = (e) => {
    e.preventDefault();
    if (Provinci.id) {
      const update = ListProvinci.map((item) =>
        item.id === Provinci.id
          ? {
              id: Provinci.id,
              provinci: Provinci.provinci,
            }
          : item
      );
      setListProvinci(update);
    } else {
      const data = {
        id: Date.now(),
        provinci: Provinci.provinci,
      };
      setListProvinci([...ListProvinci, data]);
    }
    setProvinci({
      id: "",
      provinci: "",
    });

    navigate(`/Provinci`);
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Provinci">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Provinci.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Provinci
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={Provinci.provinci || ""}
              required
              onChange={(e) =>
                setProvinci({ ...Provinci, provinci: e.target.value })
              }
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Provinci.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Provinci.id ? "Update" : "Save"}
            </button>
            {!Provinci.id && (
              <button
                onClick={() => setProvinci({})}
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
