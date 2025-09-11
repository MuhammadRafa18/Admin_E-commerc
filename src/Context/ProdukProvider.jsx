import React, { createContext, useEffect, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = ({ children }) => {
  const [ListProduk, setListProduk] = useState([]);
  const [ListUser, setListUser] = useState([]);
  const [Produk, setProduk] = useState({});
  const [User, setUser] = useState({});
  const [UserLogin,setUserLogin] = useState({});
  const [isLogin, setIslogin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ListCategories, setListCategories] = useState([]);
  const [Categories, setCategories] = useState({});
  const [ListType, setListType] = useState([]);
  const [Type, setType] = useState({});
  const [Payment, setPayment] = useState({});
  const [ListPayment, setListPayment] = useState([]);
  const [Delevery, setDelevery] = useState({});
  const [ListDelevery, setListDelevery] = useState([]);
  const [Provinci, setProvinci] = useState({});
  const [ListProvinci, setListProvinci] = useState([]);
  const [City,setCity] = useState({})
  const [ListCity,setListCity] = useState([])

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

    const saveuser = localStorage.getItem("ListUser");
    if (saveuser) {
      try {
        setListUser(JSON.parse(saveuser));
      } catch {
        console.error("Data Tidak ada :", err);
        setListUser([]);
      }
    }

    const Login = localStorage.getItem("isLogin");
    if (Login) {
      try {
        setIslogin(JSON.parse(Login));
      } catch {
        console.error("Login error :");
        setIslogin(null);
      }
    }
    const categories = localStorage.getItem("ListCategories");
    if (categories) {
      try {
        setListCategories(JSON.parse(categories));
      } catch {
        console.error("Category error :");
        setListCategories([]);
      }
    }
    const types = localStorage.getItem("ListType");
    if (types) {
      try {
        setListType(JSON.parse(types));
      } catch {
        console.error("Type erro :");
        setListType([]);
      }
    }
    const ListPayments = localStorage.getItem("ListPayment");
    if (ListPayments) {
      try {
        setListPayment(JSON.parse(ListPayments));
      } catch {
        console.error("Type erro :");
        setListPayment([]);
      }
    }
    const ListDeleverys = localStorage.getItem("ListDelevery");
    if (ListDeleverys) {
      try {
        setListDelevery(JSON.parse(ListDeleverys));
      } catch {
        console.error("Type erro :");
        setListDelevery([]);
      }
    }
    const ListProvincis = localStorage.getItem("ListProvinci");
    if (ListProvincis) {
      try {
        setListProvinci(JSON.parse(ListProvincis));
      } catch {
        console.error("Type erro :");
        setListProvinci([]);
      }
    }
     const ListCitys = localStorage.getItem("ListCity");
    if (ListCitys) {
      try {
        setListCity(JSON.parse(ListCitys));
      } catch {
        console.error("Type erro :");
        setListCity([]);
      }
    }
     const UserLogins = localStorage.getItem("UserLogin");
    if (UserLogins) {
      try {
        setUserLogin(JSON.parse(UserLogins));
      } catch {
        console.error("Type erro :");
        setUserLogin({});
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("ListProduk", JSON.stringify(ListProduk));
  }, [ListProduk]);

  useEffect(() => {
    localStorage.setItem("ListUser", JSON.stringify(ListUser));
  }, [ListUser]);
  useEffect(() => {
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }, [isLogin]);
  useEffect(() => {
    localStorage.setItem("ListCategories", JSON.stringify(ListCategories));
  }, [ListCategories]);
  useEffect(() => {
    localStorage.setItem("ListType", JSON.stringify(ListType));
  }, [ListType]);
    useEffect(() => {
    localStorage.setItem("ListPayment", JSON.stringify(ListPayment));
  }, [ListPayment]);
    useEffect(() => {
    localStorage.setItem("ListDelevery", JSON.stringify(ListDelevery));
  }, [ListDelevery]);
    useEffect(() => {
    localStorage.setItem("ListProvinci", JSON.stringify(ListProvinci));
  }, [ListProvinci]);
 useEffect(() => {
    localStorage.setItem("ListCity", JSON.stringify(ListCity));
  }, [ListCity]);
   useEffect(() => {
    localStorage.setItem("UserLogin", JSON.stringify(UserLogin));
  }, [UserLogin]);
  return (
    <ProdukContext.Provider
      value={{
        ListProduk,
        setListProduk,
        Produk,
        setProduk,
        User,
        setUser,
        ListUser,
        setListUser,
        isLogin,
        setIslogin,
        loading,
        setLoading,
        ListCategories,
        setListCategories,
        Categories,
        setCategories,
        Type,
        setType,
        ListType,
        setListType,
        Payment, 
        setPayment,
        ListPayment,
        setListPayment,
        Delevery,
        setDelevery,
        ListDelevery,
        setListDelevery,
        Provinci,
        setProvinci,
        ListProvinci,
        setListProvinci,
        City,
        setCity,
        ListCity,
        setListCity,
        UserLogin,
        setUserLogin
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
};
