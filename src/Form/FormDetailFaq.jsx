import { Link } from "react-router";
import { UseFecth } from "../hooks/UseFecth";
import Prev from "../assets/panah.svg";
import dropdown from "../assets/panah.svg";


export const FormDetailFaq = () => {

  const { Data: Faq } = UseFecth(`/faq`);
  const { Data } = UseFecth(`/detailfaq`);


  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      Object.entries(DetailFaq).forEach(([key,value]) => {
        formdata.append(key,value);
      })

      if (id) formdata.append("_method", "put");
      const url = id ? `${api}/detailfaq/${id}` : `${api}/detailfaq`;
      await axios.post(url, formdata, {
        headers: {
          Authorization: `$Bearer ${token}`,
        },
      });
      alert("Produk berhasil ditambahkan ");
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
                onChange={(e) =>
                  setDetailFaq({ ...DetailFaq, faq_id: e.target.value })
                }
                value={DetailFaq.faq_id || ""}
                required
              >
                <option value="">Pilih Judul</option>
                {Faq?.data?.length > 0 &&
                  Faq.data.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.judul}
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
              Quest
            </label>
            <input
              id="size"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) =>
                setDetailFaq({ ...DetailFaq, quest: e.target.value })
              }
              value={DetailFaq.quest || ""}
              required
            />
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
                setDetailFaq({ ...DetailFaq, answer: e.target.value })
              }
              value={DetailFaq.answer || ""}
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
