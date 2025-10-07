import React, { useContext, useEffect, useState } from "react";
import Prev from "../../assets/panah.svg";
import dropdown from "../../assets/panah.svg";
import { data, Link, useNavigate, useParams } from "react-router";
import { ProdukContext } from "../../Context/ProdukProvider";
import axios from "axios";
import { UseFecth } from "../../hook/UseFecth";
import { AuthContext } from "../../Context/AuthContext";

export const FormProduk = () => {
  const { ListProduk, setListProduk, Produk, setProduk } =
    useContext(ProdukContext);
  const navigate = useNavigate();
  const { Data: category } = UseFecth(`http://localhost:5000/category`);
  const { Data: type } = UseFecth(`http://localhost:5000/type`);
  const [imageproduk, setimageproduk] = useState(null);
  const [imagebanner, setimagebanner] = useState(null);
  const [image, setimage] = useState(null);
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/produk/${id}`, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        })
        .then((res) => setProduk(res.data));
    }
  }, [id]);

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === "Banner") {
        setimagebanner(reader.result); // hasil base64
      } else if (type === "Produk") {
        setimageproduk(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const HandleForm = async (e) => {
    e.preventDefault();
    try {
      //  const formData = new FormData();
      // formData.append("id", Produk.id || Date.now())
      // formData.append("gambar",  image || Produk.gambar || item.gambar,)
      // formData.append("name", Produk.name || "");
      // formData.append("type", Produk.type || "");
      // formData.append("category", Produk.category || "");
      // formData.append("price", Produk.price || 0);
      // formData.append("size", Produk.size || "");
      // formData.append("rating", Produk.rating || 0);
      // formData.append("stok", Produk.stok || 0);
      const formdata = {
        id: Produk.id || Date.now().toString(), // auto id kalau belum ada
        imageproduk: imageproduk || Produk.imageproduk || "", // bisa base64 atau link
        imagebanner: imagebanner || Produk.imagebanner || "", // bisa base64 atau link
        title: Produk.title || "",
        type: Produk.type || "",
        category: Produk.category || "",
        cart: false || true,
        favorite: false || true,
        price: Produk.price || 0,
        size: Produk.size || "",
        rating: Produk.rating || 0,
        stok: Produk.stok || 0,
        typeProduk: Produk.typeProduk || "",
        description:Produk.description || "",
        useproduk:Produk.useproduk || "",
        ingredient:Produk.ingredient || ""
      };

      if (Produk.id) {
        // UPDATE
        await axios.put(`http://localhost:5000/produk/${Produk.id}`, formdata, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert("Produk berhasil diupdate ");
      } else {
        // CREATE
        await axios.post("http://localhost:5000/produk", formdata, {
          headers: {
            Authorization: `$Bearer ${token}`,
          },
        });
        alert("Produk berhasil ditambahkan ");
      }
      setimage(null);
      navigate("/ProdukPage");
    } catch (err) {
      console.error("Error saat create/update produk:", err);
      alert("Gagal menyimpan produk ");
    }
  };
  // console.log(Produk)

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
          <div className="flex items-center space-x-3">
            <div className="w-1/2">
              {Produk.id ? (
                <img src={Produk.imageproduk} className="w-10" />
              ) : null}
              <label
                htmlFor="ImageProduk"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                ImageProduk
              </label>
              <input
                id="ImageProduk"
                type="file"
                className="w-full border rounded-xl px-2.5 py-3"
                required={!Produk.id}
                onChange={(e) => handleFileChange(e, "Produk")}
              />
            </div>
            <div className="w-1/2">
              {Produk.id ? (
                <img src={Produk.imagebanner} className="w-10" />
              ) : null}
              <label
                htmlFor="ImageBanner"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                ImageBanner
              </label>
              <input
                id="ImageBanner"
                type="file"
                className="w-full border rounded-xl px-2.5 py-3"
                required={!Produk.id}
                onChange={(e) => handleFileChange(e, "Banner")}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1/2">
              <label
                htmlFor="name"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                Name Produk
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name Produk"
                className="w-full border rounded-xl px-2.5 py-3 "
                value={Produk.title || ""}
                required
                onChange={(e) =>
                  setProduk({ ...Produk, title: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label className="text-base block">Type</label>
              <div className="relative group">
                <img
                  src={dropdown}
                  alt=""
                  className="absolute right-3 bottom-4  "
                />
                <select
                  className="w-full border  rounded-xl px-2.5 py-3.5 text-sm appearance-none  "
                  onChange={(e) =>
                    setProduk({ ...Produk, type: e.target.value })
                  }
                  value={Produk.type || ""}
                  required
                >
                  <option value="">Pilih Type</option>
                  {type?.length > 0 &&
                    type.map((item) => (
                      <option key={item.id} value={item.type}>
                        {item.type}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1/2 space-y-2 ">
              <label className="text-base block">Category</label>
              <div className="relative group">
                <img
                  src={dropdown}
                  alt=""
                  className="absolute right-3 bottom-4  "
                />
                <select
                  className="w-full border  rounded-xl px-2.5 py-3.5 text-sm appearance-none  "
                  onChange={(e) =>
                    setProduk({ ...Produk, category: e.target.value })
                  }
                  value={Produk.category || ""}
                  required
                >
                  <option value="">Pilih Category</option>
                  {category?.length > 0 &&
                    category.map((item) => (
                      <option key={item.id} value={item.category}>
                        {item.category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="w-1/2">
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
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1/2">
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
                onChange={(e) =>
                  setProduk({ ...Produk, price: e.target.value })
                }
                value={Produk.price || ""}
                required
              />
            </div>
            <div className="w-1/2">
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
                onChange={(e) =>
                  setProduk({ ...Produk, rating: e.target.value })
                }
                required
                value={Produk.rating || ""}
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-1/2 space-y-2 ">
              <label className="text-base block">Type Produk</label>
              <div className="relative group">
                <img
                  src={dropdown}
                  alt=""
                  className="absolute right-3 bottom-4  "
                />
                <select
                  className="w-full border  rounded-xl px-2.5 py-3.5 text-sm appearance-none  "
                  onChange={(e) =>
                    setProduk({ ...Produk, typeProduk: e.target.value })
                  }
                  value={Produk.typeProduk || ""}
                  required
                >
                  <option value="">Pilih Type Produk</option>
                    <option  value="Bestseller">Bestseller</option>
                    <option  value="New Product">New Product</option>
                    <option  value="Normal Product">Normal Product</option>
                </select>
              </div>
            </div>
            <div className="w-1/2">
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
          </div>
            <div>
              <label
                htmlFor="name"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                Deskripsi
              </label>
              <textarea
                id="name"
                placeholder="Name Produk"
                className="w-full border rounded-xl px-2.5 py-3 "
                value={Produk.description || ""}
                required
                onChange={(e) =>
                  setProduk({ ...Produk, description: e.target.value })
                }
              />
            </div>
             <div>
              <label
                htmlFor="name"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                How To Use
              </label>
              <textarea
                id="name"
                placeholder="Name Produk"
                className="w-full border rounded-xl px-2.5 py-3 "
                value={Produk.useproduk || ""}
                required
                onChange={(e) =>
                  setProduk({ ...Produk, useproduk: e.target.value })
                }
              />
            </div>
             <div>
              <label
                htmlFor="name"
                className="block font-medium mb-1 text-base cursor-pointer"
              >
                Ingredient
              </label>
              <textarea
                id="name"
                placeholder="Name Produk"
                className="w-full border rounded-xl px-2.5 py-3 "
                value={Produk.ingredient || ""}
                required
                onChange={(e) =>
                  setProduk({ ...Produk, ingredient: e.target.value })
                }
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
