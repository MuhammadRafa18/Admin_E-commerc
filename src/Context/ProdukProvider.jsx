import React, { createContext, useEffect, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = ({ children }) => {
  const [Produk, setProduk] = useState({});
  const [User, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [DetailFaq,setDetailFaq] = useState({})
  const [Categories, setCategories] = useState({});

  const [Type, setType] = useState({});
  const [Payment, setPayment] = useState({});

  const [Delevery, setDelevery] = useState({});

  const [Provinci, setProvinci] = useState({});

  const [City, setCity] = useState({});

  return (
    <ProdukContext.Provider
      value={{
        Produk,
        setProduk,
        User,
        setUser,
        DetailFaq,
        setDetailFaq,
        loading,
        setLoading,

        Categories,
        setCategories,
        Type,
        setType,

        Payment,
        setPayment,

        Delevery,
        setDelevery,

        Provinci,
        setProvinci,

        City,
        setCity,
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
};
