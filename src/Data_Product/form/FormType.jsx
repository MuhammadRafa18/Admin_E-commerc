import React, { useContext, useEffect } from "react";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Store/ProdukProvider";
import axios from "axios";
import { AuthContext } from "../../Store/AuthContext";
import { UseFecth } from "../../hooks/UseFecth";

export const FormType = () => {
  const navigate = useNavigate();
  const { Type, setType } = useContext(ProdukContext);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const api = import.meta.env.VITE_API;
  const { Data } = UseFecth(`${api}/type`);
  const findData = Data?.data?.find((item) => item.id === Number(id));
  useEffect(() => {
    if (id) {
      setType(findData);
    }
  }, [id,findData]);

  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(Type).forEach(([keys, value]) => {
        formdata.append(keys, value);
      });

      if (Type.id) formdata.append("_method", "PUT");
      const url = id ? ` ${api}/type/${id}` : `${api}/type`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
      alert("Type berhasil disimpan ");
      navigate(`/Type`);
    } catch (err) {
      console.error("Error saat create/update produk:", err);
      alert("Gagal menyimpan produk ");
    }
  };
  console.log(Type);
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Type">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Type
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={Type?.type || ""}
              required
              onChange={(e) => setType({ ...Type, type: e.target.value })}
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {id ? "Update" : "Save"}
            </button>
            {!id && (
              <button
                onClick={() => setType({})}
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
