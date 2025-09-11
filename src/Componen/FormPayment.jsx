import React, { useContext, useState } from "react";
import { ProdukContext } from "../Context/ProdukProvider";
import { Link, useNavigate } from "react-router";
import Prev from "../assets/panah.svg";


export const FormPayment = () => {
  const { Payment, setPayment, ListPayment, setListPayment } =
    useContext(ProdukContext);
    const navigate = useNavigate();
    const [image,setimage] = useState(null)
      const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setimage(reader.result); // hasil base64
    };
    reader.readAsDataURL(file);
  };
    const HandleForm = (e) => {
     e.preventDefault();
     if(Payment.id){
      const update = ListPayment.map((item) => item.id === Payment.id ? {
        id:Payment.id,
        icon:image || Payment.icon || item.icon,
        payment:Payment.payment
      } : item)
      setListPayment(update)
     }else{
       const data = {
        id:Date.now(),
        icon:image,
        payment:Payment.payment
       }
       setListPayment([...ListPayment,data])
     }
     setPayment({
        id:"",
        payment:""
     })
     setimage(null)
     navigate(`/Payment`)
    }
  return (
    <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Payment">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Payment.id ? "Update Produk" : "Add Produk"}</h1>
        </header>

        {/* <!-- Address Form --> */}
        <form onSubmit={HandleForm} className="space-y-4">
          {/* <!-- Fullname --> */}
          {Payment.id ? <img src={Payment.icon} className="w-10" /> : null}
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
              required={!Payment.id}
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
              value={Payment.payment || ""}
              required
              onChange={(e) => setPayment({ ...Payment, payment: e.target.value })}
            />
          </div>

          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Payment.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Payment.id ? "Update" : "Save"}
            </button>
            {!Payment.id && (
              <button
                onClick={() => setPayment({})}
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
