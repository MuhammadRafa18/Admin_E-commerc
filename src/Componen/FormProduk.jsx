import React, { useContext, useEffect, useState } from "react";
import Prev from "../assets/panah.svg";
import dropdown from "../assets/panah.svg";
import { Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../Context/ProdukProvider";
import axios from "axios";

export const FormProduk = () => {
  const { ListProduk, setListProduk, Produk, setProduk } =
    useContext(ProdukContext);
  const navigate = useNavigate();
  const [image, setimage] = useState(null);
  const {id} = useParams();
  useEffect(() => {
       if(id){
        axios
        .get(`https://dummyjson.com/products/${id}`)
        .then((res) => setProduk(res.data.products))
       }
  },[id])

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // hasil base64
    };
    reader.readAsDataURL(file);
  };

  const HandleForm = async (e) => {
    e.preventDefault();
    try{
     const formData = new FormData();
    formData.append("id", Produk.id || Date.now())
    formData.append("gambar",  image || Produk.gambar || item.gambar,)
    formData.append("name", Produk.name || "");
    formData.append("type", Produk.type || "");
    formData.append("category", Produk.category || "");
    formData.append("price", Produk.price || 0);
    formData.append("size", Produk.size || "");
    formData.append("rating", Produk.rating || 0);
    formData.append("stok", Produk.stok || 0);


   if (Produk.id) {
      // UPDATE
      await axios.put(
        `http://localhost:3000/produk/${Produk.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Produk berhasil diupdate ✅");
    } else {
      // CREATE
      await axios.post("http://localhost:3000/produk", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Produk berhasil ditambahkan ✅");
    }
     setProduk({
      name: "",
      price: "",
      size: "",
      rating: "",
      stok: "",
    });
    setimage(null);
    navigate("/ProdukPage");
  } catch (err) {
    console.error("Error saat create/update produk:", err);
    alert("Gagal menyimpan produk ❌");
  }
  };

  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/ProdukPage">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Produk.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}
          <div>
            <label
              htmlFor="gambar"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Image
            </label>
            <input
              id="gambar"
              type="file"
              className="w-full border rounded-xl px-2.5 py-3"
              required={!Produk.id}
              onChange={handleFileChange}
            />
          </div>
          <div>
            <label
              htmlFor="name"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              value={Produk.name || ""}
              required
              onChange={(e) => setProduk({ ...Produk, name: e.target.value })}
            />
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-base block">Type</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={(e) => setProduk({ ...Produk, type: e.target.value })}
                value={Produk.type || ""}
                required
              >
                <option value="">Pilih Type</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Skin Type">Skin Type</option>
                <option value="New Arrival">New Arrival</option>
              </select>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <label className="text-base block">Category</label>
            <div className="relative group">
              <img
                src={dropdown}
                alt=""
                className="absolute right-3 bottom-4  "
              />
              <select
                className="w-full border  rounded-xl px-2.5 py-3 text-sm appearance-none  "
                onChange={(e) =>
                  setProduk({ ...Produk, category: e.target.value })
                }
                value={Produk.category || ""}
                required
              >
                <option value="">Pilih Category</option>
                <option value="Facewash">Facewash</option>
                <option value="Serum">Serum</option>
                <option value="Sunscreen">Sunscreen</option>
                <option value="Mosturizer">Mosturizer</option>
              </select>
            </div>
          </div>
          <div>
            <label
              htmlFor="size"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Size
            </label>
            <input
              id="size"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) => setProduk({ ...Produk, size: e.target.value })}
              value={Produk.size || ""}
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Price
            </label>
            <input
              id="price"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) => setProduk({ ...Produk, price: e.target.value })}
              value={Produk.price || ""}
              required
            />
          </div>
          <div>
            <label
              htmlFor="rating"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Rating
            </label>
            <input
              id="rating"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) => setProduk({ ...Produk, rating: e.target.value })}
              required
              value={Produk.rating || ""}
            />
          </div>
          <div>
            <label
              htmlFor="stok"
              className="block font-medium mb-1 text-base cursor-pointer"
            >
              Stok
            </label>
            <input
              id="stok"
              type="text"
              className="w-full border rounded-xl px-2.5 py-3 "
              onChange={(e) => setProduk({ ...Produk, stok: e.target.value })}
              required
              value={Produk.stok || ""}
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Produk.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Produk.id ? "Update" : "Save"}
            </button>
            {!Produk.id && (
              <button
                onClick={() => setProduk({})}
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
