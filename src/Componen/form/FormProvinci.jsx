import React, { useContext, useEffect } from "react";
import { ProdukContext } from "../../Context/ProdukProvider";
import { Link, useNavigate, useParams } from "react-router";
import Prev from "../../assets/panah.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

export const FormProvinci = () => {
  const { Provinci, setProvinci, ListProvinci, setListProvinci } =
    useContext(ProdukContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      try {
        axios
          .get(`http://localhost:5000/Provinci/${id}`, {
            headers: {
              Authorization: `$Bearer ${token}`,
            },
          })
          .then((res) => setProvinci(res.data));
      } catch (err) {
        console.error("Data gagal request :", err);
      }
    }
  }, [id]);
  const HandleForm = async (e) => {
    e.preventDefault();
    const formdata = {
      id: Provinci.id || Date.now().toString(),
      provinci: Provinci.provinci || "",
    };

    if (Provinci.id) {
      await axios.put(
        `http://localhost:5000/Provinci/${Provinci.id}`,
        formdata,
        {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        }
      );
    } else {
      await axios.post(`http://localhost:5000/Provinci`, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
    }

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
