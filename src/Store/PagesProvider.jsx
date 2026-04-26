import { createContext, useState } from "react";

export const PagesContext = createContext();

export const PagesProvider = ({ children }) => {
  const [Banner, setBanner] = useState({});
  const [VisiMisi, setVisiMisi] = useState({});

  const [ParagrafAbout, setParagrafAbout] = useState({});
  const [Result, setResult] = useState([]);
  const [Power, setPower] = useState({});

  const [Faq, setFaq] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  return (
    <PagesContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedData,
        setSelectedData,
        ParagrafAbout,
        setParagrafAbout,
        Power,
        setPower,
        Faq,
        setFaq,
        VisiMisi,
        setVisiMisi,
        Banner,
        setBanner,
        isSidebarOpen,
        setIsSidebarOpen,
        Result,
        setResult,
      }}
    >
      {children}
    </PagesContext.Provider>
  );
};
