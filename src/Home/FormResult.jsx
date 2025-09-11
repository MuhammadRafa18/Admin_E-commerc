import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { PagesContext } from "../Context/PagesProvider";
import Prev from "../assets/panah.svg";


export const FormResult = () => {
     const {ListResult, setListResult,Result, setResult} = useContext(PagesContext)
     const [image,setimage] = useState(null)
    const navigate = useNavigate();
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
     if(Result.id){
       const update = ListResult.map((item) => item.id === Result.id ? {id:Result.id,gambar: image || Result.gambar || item.gambar} : item ) 
       setListResult(update)
    }else{
    const data = {
        id:Date.now(),
        gambar:image,
    }
    setListResult([...ListResult,data])
}
    // console.log(data)
    setResult({
        id:"",
    })
    setimage(null)
    navigate(`/Result`)
  };
  return (
       <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
      <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
        {/* <!-- Header --> */}
        <header className="flex items-center space-x-1 text-xl font-medium">
          <Link to="/Result">
            <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
          </Link>
          <h1>{Result.id ? "Update Produk" : "Add Produk"}</h1>
        </header>
        <form onSubmit={HandleForm} className="space-y-4">
            {Result.id ? 
            <img src={Result.gambar} className="w-10"/>
            : null}
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
              required={!Result.id}
              onChange={handleFileChange}
            />
          </div>
          {/* <!-- Buttons --> */}
          <div className="w-full flex space-x-3 mt-6">
            <button
              type="submit"
              className={`bg-black text-white px-6 py-2 rounded-full  ${
                Result.id ? "w-full" : "w-1/2"
              } cursor-pointer `}
            >
              {Result.id ? "Update" : "Save"}
            </button>
            {!Result.id && (
              <button
                onClick={() => setResult({})}
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
  )
}

