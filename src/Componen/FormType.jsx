import React, { useContext } from 'react'
import Prev from "../assets/panah.svg";
import dropdown from "../assets/panah.svg";
import { Link, useNavigate } from 'react-router';
import { ProdukContext } from '../Context/ProdukProvider';

export const FormType = () => {
    const navigate = useNavigate();
      const { Type, setType, ListType, setListType } = useContext(ProdukContext);
    
     const HandleForm = (e) => {
    e.preventDefault();
    if(Type.id){
       const update = ListType.map((item) => item.id === Type.id ? {id:Type.id,type:Type.type} : item ) 
       setListType(update)
    }else{
      const Data = {
        id:Date.now(),
        type:Type.type
      }
      setListType([...ListType, Data]);
      setType({
        id:"",
        type:""
      }
    )
  }
  navigate(`/Type`)
    }
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
                  value={ Type.type ||  ""}
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
  )
}
