import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ProdukContext } from "../Context/ProdukProvider";
import { AuthContext } from "../Context/AuthContext";

export const AdminLayout = ({ children }) => {
  const [openData, setOpenData] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openFaq, setopenFaq] = useState(false);
  const { User ,loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const {logout} = useContext(AuthContext)
  const handleLogout = () => {
    if (window.confirm("Mau log out?")) {
      logout();
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-semibold  text-lg border-b border-gray-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setOpenData(!openData)}
            className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
          >
            Data
            <span
              className={`transform transition-transform ${
                openData ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
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
               <Link to="/Delevery" className="block px-2 py-1  hover:underline">
                Delevery
              </Link>
              <Link to="/Payment" className="block px-2 py-1  hover:underline">
                Payment
              </Link>
              <Link to="/Provinci" className="block px-2 py-1  hover:underline">
                Provinci
              </Link>
              <Link to="/City" className="block px-2 py-1  hover:underline">
                City
              </Link>
              {User.role === "SuperAdmin" ? (
                <Link to="/User" className="block px-2 py-1  hover:underline">
                  User
                </Link>
              ) : null}
            </div>
          )}
          <button
            onClick={() => setOpenHome(!openHome)}
            className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
          >
            Home
            <span
              className={`transform transition-transform ${
                openHome ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {openHome && (
            <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
              <Link
                to="/ProdukType"
                className="block px-2 py-1  hover:underline"
              >
                ProdukType
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
            <span
              className={`transform transition-transform ${
                openAbout ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {openAbout && (
            <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
              <Link to="/Section" className="block px-2 py-1  hover:underline">
                Section
              </Link>
              <Link
                to="/ParagrafSection"
                className="block px-2 py-1  hover:underline"
              >
                Paragraf Section
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
            <span
              className={`transform transition-transform ${
                openFaq ? "rotate-180" : "rotate-0"
              }`}
            >
              ▼
            </span>
          </button>
          {openFaq && (
            <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
              <Link to="/Faq" className="block px-2 py-1  hover:underline">
                Faq
              </Link>
            </div>
          )}
        </nav>
        <button onClick={handleLogout}>log out</button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};
