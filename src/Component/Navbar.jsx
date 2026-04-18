import React, { useContext, useEffect, useRef, useState } from "react";
import profil from "../assets/profil.jpg";
import city from "../assets/city.jpg";
import { AuthContext } from "../Store/AuthContext";
import { PagesContext } from "../Store/PagesProvider";

export const Navbar = () => {
  const { logout, User } = useContext(AuthContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(PagesContext);
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleLogout = () => {
    if (window.confirm("Mau log out?")) {
      logout();
    }
  };
  return (
    <>
      <header className=" relative z-50">
        <div className="px-10 py-3 flex justify-between items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="cursor-pointer"
          >
            <path
              fill="#000"
              d="M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z"
            />
          </svg>

          <div className="flex items-center space-x-4 ">
            <div
              className="relative  cursor-pointer"
              ref={menuRef}
              onClick={() => setOpenMenu(!openMenu)}
            >
              <div className="flex  items-center space-x-3">
                <img
                  src={profil}
                  alt="account"
                  className="w-8 rounded cursor-pointer"
                />
                <div className="flex flex-col text-xs">
                  <span className="font-semibold">Rafa</span>
                  <span>{User?.role}</span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  className="rotate-90"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    d="m9 6l6 6l-6 6"
                  />
                </svg>
              </div>

              {openMenu && (
                <div
                  className="w-[352px] h-[90px] flex items-center justify-between  p-4  absolute top-9  -translate-x-1/2 
                  text-gray-800 rounded-xl shadow-lg   animate-fadeIn"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.6), rgba(14, 165, 233, 0.6)), url(${city})`,
                  }}
                >
                  <div className="flex items-start space-x-2 text-white ">
                    <img
                      src={profil}
                      alt="account"
                      className="w-8 rounded-full cursor-pointer"
                    />
                    <div className="text-xs">
                      <span className="font-semibold">Rafa</span>
                      <span>{User?.role}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 font-semibold text-center text-xs text-white rounded-full  bg-gray-600   transition cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
