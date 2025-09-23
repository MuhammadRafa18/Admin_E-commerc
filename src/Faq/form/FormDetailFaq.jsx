import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Context/ProdukProvider";
import { AuthContext } from "../../Context/AuthContext";
import { UseFecth } from "../../hook/UseFecth";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import axios from "axios";

export const FormDetailFaq = () => {
  const navigate = useNavigate();
  const { DetailFaq, setDetailFaq } = useContext(ProdukContext);
  const [SelectFaq, setSelectFaq] = useState();
  const { Data: Faq } = UseFecth(`http://localhost:5000/Faq`);

  const { id } = useParams();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/DetailFaq/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        })
        .then(async (res) => {
          setDetailFaq(res.data);
          if (res.data.judul) {
            const FaqRes = await axios.get(
              `http://localhost:5000/Faq?judul=${res.data.judul}`
            );
            if(FaqRes.data.length > 0){
                setSelectFaq(FaqRes.data[0])
            }
          }
        });
    }
  }, [id]);

  const HandleChange = async (e) => {
    const SelectedJudul = e.target.value;
    setDetailFaq({
      ...DetailFaq,
      judul: SelectedJudul,
      faq: "",
      detailfaq: "",
    });
    if (SelectedJudul) {
      try {
        const res = await axios.get(
          `http://localhost:5000/Faq?judul=${SelectedJudul}`
        );
        if (res.data.length > 0) {
          setSelectFaq(res.data[0]);
        } else {
          setSelectFaq(null);
        }
      } catch (err) {
        console.error("Gagal data req :", err);
      }
    }
  };

  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = {
        id: DetailFaq.id || Date.now().toString(), // auto id kalau belum ada
        judul: DetailFaq.judul || "",
        faq: DetailFaq.faq || "",
        detailfaq: DetailFaq.detailfaq || "",
      };

      if (DetailFaq.id) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/DetailFaq/${DetailFaq.id}`,
          formdata,
          {
            headers: {
              Authorization: `$Bearer ${token}`,
            },
          }
        );
        alert("Produk berhasil diupdate ");
      } else {
        // CREATE
        await axios.post("http://localhost:5000/DetailFaq", formdata, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert("Produk berhasil ditambahkan ");
      }
      navigate("/DetailFaq");
    } catch (err) {
      console.error("Error saat create/update produk:", err);
      alert("Gagal menyimpan produk ");
    }
  };
  console.log(DetailFaq);

  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/DetailFaq">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{DetailFaq.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          <div className="space-y-2 mb-4">
            <label className="text-base block">Judul</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={HandleChange}
                value={DetailFaq.judul || ""}
                required
              >
                <option value="">Pilih Judul</option>
                {Faq?.length > 0 &&
                  Faq.map((item) => (
                    <option key={item.id} value={item.judul}>
                      {item.judul}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-base block">Faq</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={(e) =>
                  setDetailFaq({ ...DetailFaq, faq: e.target.value })
                }
                value={DetailFaq.faq || ""}
                required
                disabled={!SelectFaq}
              >
                <option value="">Pilih Faq</option>
                {SelectFaq &&
                  [SelectFaq.quest1, SelectFaq.quest2, SelectFaq.quest3]
                    .filter(Boolean)
                    .map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="size"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Detail Faq
            </label>
            <textarea
              id="size"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) =>
                setDetailFaq({ ...DetailFaq, detailfaq: e.target.value })
              }
              value={DetailFaq.detailfaq || ""}
              required
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                DetailFaq.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {DetailFaq.id ? "Update" : "Save"}
            </button>
            {!DetailFaq.id && (
              <button
                onClick={() => setDetailFaq({})}
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
