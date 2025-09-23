import React, { useContext, useEffect } from "react";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Context/ProdukProvider";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormType = () => {
  const navigate = useNavigate();
  const { Type, setType, ListType, setListType } = useContext(ProdukContext);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/type/${id}`, {
            headers: {
              Authorization: `$Bearer ${token}`,
            },
          })
          .then((res) => setType(res.data));
      } catch {
        console.error("Get data error :", err);
      }
    }
  }, [id]);

  const HandleForm = async (e) => {
    e.preventDefault();
    const formdata = {
      id: Type.id || Date.now().toString(),
      type: Type.type,
    };

    if (Type.id) {
      await axios.put(`http://localhost:5000/type/${Type.id}`, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
    } else {
      await axios.post(`http://localhost:5000/type`, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
    }
    setType({
      id: "",
      type: "",
    });
    navigate(`/Type`);
  };
  // console.log(ListType)
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ProdukPage">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Type.id ? "Update Produk" : "Add Produk"}</h1>
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
              value={Type.type || ""}
              required
              onChange={(e) => setType({ ...Type, type: e.target.value })}
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Type.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Type.id ? "Update" : "Save"}
            </button>
            {!Type.id && (
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
