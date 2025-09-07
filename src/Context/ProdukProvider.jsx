import React, { createContext, useEffect, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = ({ children }) => {
  const [ListProduk, setListProduk] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [Produk, setProduk] = useState({});
  const [User,setUser] = useState({});
  const [isLogin,setIslogin] = useState(null);
   const [loading,setLoading] = useState(true);

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
    
    const Login = localStorage.getItem("isLogin")
    if(Login){
      try{
        setIslogin(JSON.parse(Login))

      } catch {
        console.error("Login error :")
        setIslogin(null)
      }
      
    }
    setLoading(false)
  }, []);

  useEffect(() => {
    localStorage.setItem("ListProduk", JSON.stringify(ListProduk));
  }, [ListProduk]);

  useEffect(() => {
    localStorage.setItem("ListUser", JSON.stringify(ListUser));
  },[ListUser])
  useEffect(() => {
    localStorage.setItem("isLogin",JSON.stringify(isLogin));
  },[isLogin])

  return (
  <ProdukContext.Provider value={{ListProduk, setListProduk , Produk , setProduk , User, setUser, ListUser , setListUser, isLogin,setIslogin,loading,setLoading}}>
    {children}
  </ProdukContext.Provider>
  )
};
