import { createContext, useContext, useEffect, useState } from "react";

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [ProdukType, setProdukType] = useState({});
  const [ListProdukType, setListProdukType] = useState([]);
  const [loading, setloading] = useState(true);
  const [Result, setResult] = useState({});
  const [ListResult, setListResult] = useState([]);
  const [Section, setSection] = useState({});
  const [ListSection, setListSection] = useState([]);
  const [ParagrafSection, setParagrafSection] = useState({});
  const [ListParagrafSection, setListParagrafSection] = useState([]);
  const [ParagrafAbout, setParagrafAbout] = useState({});
  const [ListParagrafAbout, setListParagrafAbout] = useState([]);
  const [Power, setPower] = useState({});
  const [ListPower, setListPower] = useState([]);
  const [Faq, setFaq] = useState({});
  const [ListFaq, setListFaq] = useState([]);

  useEffect(() => {
    const TypeProduk = localStorage.getItem("ListProdukType");
    if (TypeProduk) {
      try {
        setListProdukType(JSON.parse(TypeProduk));
      } catch {
        console.error("Data Rusak:");
        setListProdukType([]);
      }
    }
    const Results = localStorage.getItem("ListResult");
    if (Results) {
      try {
        setListResult(JSON.parse(Results));
      } catch {
        console.error("Data Rusak:");
        setListResult([]);
      }
    }
    const Sections = localStorage.getItem("ListSection");
    if (Sections) {
      try {
        setListSection(JSON.parse(Sections));
      } catch {
        console.error("Data Rusak:");
        setListSection([]);
      }
    }
    const ParagrafSections = localStorage.getItem("ListParagrafSection");
    if (ParagrafSections) {
      try {
        setListParagrafSection(JSON.parse(ParagrafSections));
      } catch {
        console.error("Data Rusak:");
        setListParagrafSection([]);
      }
    }
      const ParagrafAbouts = localStorage.getItem("ListParagrafAbout");
    if (ParagrafAbouts) {
      try {
        setListParagrafAbout(JSON.parse(ParagrafAbouts));
      } catch {
        console.error("Data Rusak:");
        setListParagrafAbout([]);
      }
    }
      const powers = localStorage.getItem("ListPower");
    if (powers) {
      try {
        setListPower(JSON.parse(powers));
      } catch {
        console.error("Data Rusak:");
        setListPower([]);
      }
    }
     const Faqs = localStorage.getItem("ListFaq");
    if (Faqs) {
      try {
        setListFaq(JSON.parse(Faqs));
      } catch {
        console.error("Data Rusak:");
        setListFaq([]);
      }
    }
    setloading(false);
  }, []);
  useEffect(() => {
    localStorage.setItem("ListProdukType", JSON.stringify(ListProdukType));
  }, [ListProdukType]);
  useEffect(() => {
    localStorage.setItem("ListResult", JSON.stringify(ListResult));
  }, [ListResult]);
  useEffect(() => {
    localStorage.setItem("ListSection", JSON.stringify(ListSection));
  }, [ListSection]);
   useEffect(() => {
    localStorage.setItem("ListParagrafSection", JSON.stringify(ListParagrafSection));
  }, [ListParagrafSection]);
    useEffect(() => {
    localStorage.setItem("ListParagrafAbout", JSON.stringify(ListParagrafAbout));
  }, [ListParagrafAbout]);
      useEffect(() => {
    localStorage.setItem("ListPower", JSON.stringify(ListPower));
  }, [ListPower]);
       useEffect(() => {
    localStorage.setItem("ListFaq", JSON.stringify(ListFaq));
  }, [ListFaq]);
  return (
    <PagesContext.Provider
      value={{
        ProdukType,
        setProdukType,
        ListProdukType,
        setListProdukType,
        ListResult,
        setListResult,
        Result,
        setResult,
        ListSection,
        setListSection,
        Section,
        setSection,
        ListParagrafSection,
        setListParagrafSection,
        ParagrafSection, 
        setParagrafSection,
        ListParagrafAbout, 
        setListParagrafAbout,
        ParagrafAbout, 
        setParagrafAbout,
        ListPower, 
        setListPower,
        Power, 
        setPower,
        Faq,
        setFaq,
        ListFaq,
        setListFaq
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
