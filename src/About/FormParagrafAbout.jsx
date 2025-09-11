import React, { useContext } from "react";
import { ParagrafAbout } from "./ParagrafAbout";
import { Link, useNavigate } from "react-router";
import { PagesContext } from "../Context/PagesProvider";
import Prev from "../assets/panah.svg";


export const FormParagrafAbout = () => {
  const {
    ListParagrafAbout,
    setListParagrafAbout,
    ParagrafAbout,
    setParagrafAbout,
  } = useContext(PagesContext);
  const navigate = useNavigate();
  const HandleForm = (e) => {
    e.preventDefault();
      if (ParagrafAbout.id) {
        const update = ListParagrafAbout.map((item) => item.id === ParagrafAbout.id ? {
            id:ParagrafAbout.id,
            paragraf:ParagrafAbout.paragraf
        } : item)
        setListParagrafAbout(update)
    } else {
    const data = {
        id:Date.now(),
        paragraf:ParagrafAbout.paragraf
    }
    setListParagrafAbout([...ListParagrafAbout,data])
}
    setParagrafAbout({
        id:"",
        paragraf:""
    })
    navigate(`/ParagrafAbout`)
  }
  return (
      <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
          <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
            {/* <!-- Header --> */}
            <header className="flex items-center space-x-1 text-xl font-medium">
              <Link to="/ParagrafSection">
                <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
              </Link>
              <h1>{ParagrafAbout.id ? "Update Produk" : "Add Produk"}</h1>
            </header>
            <form onSubmit={HandleForm} className="space-y-4">
              <div>
                <label className="block text-base  mb-1 font-medium">
                  Paragraf
                </label>
                <input
                  type="text"
                  className="w-full border rounded-xl px-2.5 py-3 text-sm"
                  placeholder="Name"
                  value={ParagrafAbout.paragraf || ""}
                  onChange={(e) =>
                    setParagrafAbout({
                      ...ParagrafAbout,
                      paragraf: e.target.value,
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
