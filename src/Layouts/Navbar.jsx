import React, { useContext, useEffect, useRef, useState } from "react";

import menu from "../assets/menu.svg";
import account from "../assets/account.svg";
import { AuthContext } from "../Context/AuthContext";
import { PagesContext } from "../Context/PagesProvider";

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const {isSidebarOpen, setIsSidebarOpen} = useContext(PagesContext)
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
      <header className="bg-gray-800 relative z-50">
        <div className="px-10 py-3 flex justify-between items-center">
          {/* Menu Icon */}
          <img src={menu} alt="menu" className="w-8 cursor-pointer"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} />

          {/* Account Section */}
          <div className="relative" ref={menuRef}>
            <img
              src={account}
              alt="account"
              className="w-8 cursor-pointer"
              onClick={() => setOpenMenu(!openMenu)}
            />

            {/* Dropdown muncul saat openMenu = true */}
            {openMenu && (
              <div className=" w-fit absolute left-1/2 -translate-x-1/2 mt-2  bg-white text-gray-800 rounded-xl shadow-lg border border-gray-200 animate-fadeIn">
                <button
                  onClick={handleLogout}
                  className="block w-full text-center px-4 py-2 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
