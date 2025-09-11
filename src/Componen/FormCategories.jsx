import React, { useContext, useState } from 'react'
import Prev from "../assets/panah.svg";
import dropdown from "../assets/panah.svg";
import { Link, useNavigate } from 'react-router';
import { ProdukContext } from '../Context/ProdukProvider';
export const FormCategories = () => {
  const navigate = useNavigate();
  const {ListCategories,setListCategories,Categories,setCategories} = useContext(ProdukContext)
  const HandleForm = (e) => {
    e.preventDefault();
    if(Categories.id){
       const update = ListCategories.map((item) => item.id === Categories.id ? {id:Categories.id,category:Categories.category} : item ) 
       setListCategories(update)
    }else{
      const Data = {
        id:Date.now(),
        category:Categories.category
      }
      setListCategories([...ListCategories, Data]);
      setCategories({
        id:"",
        category:""
      }
    )
  }
  navigate(`/Categories`)
    }
  
  return (
     <div className="bg-gray-secondbackground text-black font-sans flex justify-center p-10">
          <main className="bg-white  w-1/2 shadow rounded-xl p-10 space-y-6">
            {/* <!-- Header --> */}
            <header className="flex items-center space-x-1 text-xl font-medium">
              <Link to="/ProdukPage">
                <img src={Prev} alt="" className="rotate-90 w-6 self-start mb-1" />
              </Link>
              <h1>{Categories.id ? "Update Produk" : "Add Produk"}</h1>
            </header>
    
            {/* <!-- Address Form --> */}
            <form onSubmit={HandleForm} className="space-y-4">
              {/* <!-- Fullname --> */}
         
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium mb-1 text-base cursor-pointer"
                >
                  Category
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full border rounded-xl px-2.5 py-3 "
                  value={Categories.category || ""}
                  required
                  onChange={(e) => setCategories({ ...Categories, category: e.target.value })}
                />
              </div>

    
              {/* <!-- Buttons --> */}
              <div className="w-full flex space-x-3 mt-6">
                <button
                  type="submit"
                  className={`bg-black text-white px-6 py-2 rounded-full  ${
                    Categories.id ? "w-full" : "w-1/2"
                  } cursor-pointer `}
                >
                  {Categories.id ? "Update" : "Save"}
                </button>
                {!Categories.id && (
                  <button
                    onClick={() => setCategories({})}
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
