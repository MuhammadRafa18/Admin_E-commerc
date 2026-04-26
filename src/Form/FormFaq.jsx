import React, { useContext } from "react";
import { PagesContext } from "../Store/PagesProvider";
import { Link } from "react-router";
import Prev from "../assets/panah.svg";
import axios from "axios";
import { UseFecth } from "../hooks/UseFecth";

export const FormFaq = () => {
  const { Faq, setFaq } = useContext(PagesContext);
  const { Data } = UseFecth(`/faq`);
  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(Faq).forEach(([keys, value]) => {
        formdata.append(keys, value);
      });
      if (id) formdata.append("_method", "put");
      const url = id ? `${api}/faq/${id}` : `${api}/faq`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
      alert("Data berhasil disimpan");
      navigate(`/Faq`);
    } catch (err) {
      console.error("Messages : ", err);
      alert("Data gagal dihapus");
    }
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Faq">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Faq.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            <label className="block text-base  mb-1 font-medium">Judul</label>
            <input
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Name"
              value={Faq.judul || ""}
              onChange={(e) =>
                setFaq({
                  ...Faq,
                  judul: e.target.value,
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
                Faq.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Faq.id ? "Update" : "Save"}
            </button>
            {!Faq.id && (
              <button
                onClick={() => setFaq({})}
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
