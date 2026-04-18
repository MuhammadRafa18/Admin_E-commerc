import React, { createContext, useEffect, useState } from "react";

export const ProdukContext = createContext();

export const ProdukProvider = ({ children }) => {
  const [Produk, setProduk] = useState({});
  const [User, setUser] = useState({});
  const [About, setAbout] = useState({});
  const [loading, setLoading] = useState(true);
  const [DetailFaq,setDetailFaq] = useState({})
  const [Categories, setCategories] = useState({});
  const [Type, setType] = useState({});

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
        About,
        setAbout
      }}
    >
      {children}
    </ProdukContext.Provider>
  );
};
