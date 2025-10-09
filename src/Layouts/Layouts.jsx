import React, { useContext, useState } from "react";
import { Navbar } from "./Navbar";
import { Footers } from "./Footers";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import ArrowDown from "../assets/arrow.svg";
import { PagesContext } from "../Context/PagesProvider";

export const Layouts = ({ children }) => {
  const [openData, setOpenData] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openFaq, setopenFaq] = useState(false);
  const [openOrder, setopenOrder] = useState(false);
  const { User, loading } = useContext(AuthContext);
  const {isSidebarOpen, setIsSidebarOpen} = useContext(PagesContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="w-full min-h-screen flex  "> 
        {isSidebarOpen && (

        <aside className="w-64 bg-gray-800 text-white flex flex-col border-t  border-black ">
          <div
            onClick={() => navigate("/")}
            className="p-4 font-semibold  text-lg border-b border-gray-700 cursor-pointer"
          >
            Dashboard
          </div>
          <nav className="flex-1 p-4 space-y-2">
            <button
              onClick={() => setOpenData(!openData)}
              className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              Data
              <img
                src={ArrowDown}
                alt="arrow"
                className={`w-4 h-4 transform transition-transform ${
                  openData ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {openData && (
              <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link
                  to="/ProdukPage"
                  className="block px-2 py-1  hover:underline"
                >
                  Produk
                </Link>
                <Link
                  to="/Categories"
                  className="block px-2 py-1  hover:underline"
                >
                  Categories
                </Link>
                <Link to="/Type" className="block px-2 py-1  hover:underline">
                  Type
                </Link>
                {User.role === "SuperAdmin" ? (
                  <Link to="/UserAdmin" className="block px-2 py-1  hover:underline">
                    UserAdmin
                  </Link>
                ) : null}
              </div>
            )}
            <button
              onClick={() => setOpenHome(!openHome)}
              className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              Home
              <img
                src={ArrowDown}
                alt="arrow"
                className={`w-4 h-4 transform transition-transform ${
                  openHome ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {openHome && (
              <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link
                  to="/ProdukType"
                  className="block px-2 py-1  hover:underline"
                >
                  ProdukType
                </Link>
                <Link to="/Banner" className="block px-2 py-1  hover:underline">
                  Banner
                </Link>
                <Link to="/Result" className="block px-2 py-1  hover:underline">
                  Result
                </Link>
              </div>
            )}
            <button
              onClick={() => setOpenAbout(!openAbout)}
              className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              About
              <img
                src={ArrowDown}
                alt="arrow"
                className={`w-4 h-4 transform transition-transform ${
                  openAbout ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {openAbout && (
              <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link
                  to="/VisiMisi"
                  className="block px-2 py-1  hover:underline"
                >
                  Visi Misi
                </Link>
                <Link
                  to="/ParagrafAbout"
                  className="block px-2 py-1  hover:underline"
                >
                  Paragraf About
                </Link>
                <Link to="/Power" className="block px-2 py-1  hover:underline">
                  Power
                </Link>
              </div>
            )}
            <button
              onClick={() => setopenFaq(!openFaq)}
              className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              Faq
              <img
                src={ArrowDown}
                alt="arrow"
                className={`w-4 h-4 transform transition-transform ${
                  openFaq ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {openFaq && (
              <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link to="/Faq" className="block px-2 py-1  hover:underline">
                  Faq
                </Link>
                <Link
                  to="/DetailFaq"
                  className="block px-2 py-1  hover:underline"
                >
                  DetailFaq
                </Link>
              </div>
            )}
            <button
              onClick={() => setopenOrder(!openOrder)}
              className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
            >
              Order
              <img
                src={ArrowDown}
                alt="arrow"
                className={`w-4 h-4 transform transition-transform ${
                  openOrder ? "rotate-90" : "-rotate-90"
                }`}
              />
            </button>
            {openOrder && (
              <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link to="/Order" className="block px-2 py-1  hover:underline">
                  Order
                </Link>
              </div>
            )}
          </nav>
        </aside>
        )}
      <div className=" flex-1 p-6 overflow-y-auto bg-gray-secondbackground">
        {children}
      </div>
      </div>
      <Footers />
    </div>
  );
};
