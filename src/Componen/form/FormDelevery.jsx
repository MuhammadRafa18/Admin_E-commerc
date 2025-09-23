import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Context/ProdukProvider";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormDelevery = () => {
  const { Delevery, setDelevery, ListDelevery, setListDelevery } =
    useContext(ProdukContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/delevery/${id}`, {
            headers: {
              Authorization: `$Bearer ${token}`,
            },
          })
          .then((res) => setDelevery(res.data));
      } catch (err) {
        console.error("Data Delevery ini tidak ada : ", err);
      }
    }
  }, [id]);
  const HandleForm = async (e) => {
    e.preventDefault();
    const formdata = {
      id: Delevery.id || Date.now().toString() || "",
      delevery: Delevery.delevery || "",
    };
    if (Delevery.id) {
      await axios.put(
        `http://localhost:5000/delevery/${Delevery.id}`,
        formdata,
        {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(`http://localhost:5000/delevery`, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
    }
    setDelevery({
      id: "",
      delevery: "",
    });

    navigate(`/Delevery`);
  };
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Delevery">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Delevery.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Delevery
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={Delevery.delevery || ""}
              required
              onChange={(e) =>
                setDelevery({ ...Delevery, delevery: e.target.value })
              }
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Delevery.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Delevery.id ? "Update" : "Save"}
            </button>
            {!Delevery.id && (
              <button
                onClick={() => setDelevery({})}
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
