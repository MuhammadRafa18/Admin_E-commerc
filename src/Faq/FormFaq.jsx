import React, { useContext } from "react";
import { PagesContext } from "../Context/PagesProvider";
import { Link, useNavigate } from "react-router";
import Prev from "../assets/panah.svg";

export const FormFaq = () => {
  const { Faq, setFaq, ListFaq, setListFaq } = useContext(PagesContext);
  const navigate = useNavigate();
  const HandleForm = (e) => {
    e.preventDefault();
      if (Faq.id) {
        const update = ListFaq.map((item) => item.id === Faq.id ? {
            id:Faq.id,
            judul:Faq.judul,
            quest1:Faq.quest1,
            quest2:Faq.quest2,
            quest3:Faq.quest3,
        } : item)
        setListFaq(update)
    } else {
    const data = {
        id:Date.now(),
        judul:Faq.judul,
        quest1:Faq.quest1,
        quest2:Faq.quest2,
        quest3:Faq.quest3
    }
    setListFaq([...ListFaq,data])
}
    setFaq({
        id:"",
        judul:"",
        quest1:"",
        quest2:"",
        quest3:""
    })
    navigate(`/Faq`)
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
          <div>
            <label className="block text-base  mb-1 font-medium">Quest1</label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Quest1"
              value={Faq.quest1 || ""}
              onChange={(e) =>
                setFaq({
                  ...Faq,
                  quest1: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">Quest2</label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Quest1"
              value={Faq.quest2 || ""}
              onChange={(e) =>
                setFaq({
                  ...Faq,
                  quest2: e.target.value,
                })
              }
              required
            />
          </div>
          <div>
            <label className="block text-base  mb-1 font-medium">Quest3</label>
            <textarea
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 text-sm"
              placeholder="Quest1"
              value={Faq.quest3 || ""}
              onChange={(e) =>
                setFaq({
                  ...Faq,
                  quest3: e.target.value,
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
