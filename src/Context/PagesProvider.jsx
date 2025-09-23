import { createContext, useContext, useEffect, useState } from "react";

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [ProdukType, setProdukType] = useState({});

  const [loading, setloading] = useState(true);
  const [Result, setResult] = useState({});

  const [Section, setSection] = useState({});

  const [ParagrafSection, setParagrafSection] = useState({});

  const [ParagrafAbout, setParagrafAbout] = useState({});

  const [Power, setPower] = useState({});

  const [Faq, setFaq] = useState({});

  return (
    <PagesContext.Provider
      value={{
       ProdukType, 
       setProdukType,
        Result,
        setResult,
        Section,
        setSection,
        ParagrafSection,
        setParagrafSection,
        ParagrafAbout,
        setParagrafAbout,
        Power,
        setPower,
        Faq,
        setFaq,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
