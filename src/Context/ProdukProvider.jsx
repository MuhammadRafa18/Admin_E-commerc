import React, { createContext, useEffect, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = ({ children }) => {
  const [ListProduk, setListProduk] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [Produk, setProduk] = useState({});
  const [User,setUser] = useState({});

  useEffect(() => {
    const save = localStorage.getItem("ListProduk");
    if (save) {
      try {
        setListProduk(JSON.parse(save));
      } catch {
        console.error("Data di localStorage rusak:", err);
        setListProduk([]);
      }
    }

    const saveuser = localStorage.getItem("ListUser")
    if(saveuser) {
      try{
        setListUser(JSON.parse(saveuser))
      } catch {
        console.error("Data Tidak ada :", err)
        setListUser([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ListProduk", JSON.stringify(ListProduk));
  }, [ListProduk]);

  useEffect(() => {
    localStorage.setItem("ListUser", JSON.stringify(ListUser));
  },[ListUser])

  return (
  <ProdukContext.Provider value={{ListProduk, setListProduk , Produk , setProduk , User, setUser, ListUser , setListUser}}>
    {children}
  </ProdukContext.Provider>
  )
};
