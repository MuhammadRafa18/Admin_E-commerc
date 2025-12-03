import React, { useContext, useEffect, useRef, useState } from "react";
import profil from "../assets/profil.jpg";
import city from "../assets/city.jpg";
import { AuthContext } from "../Context/AuthContext";
import { PagesContext } from "../Context/PagesProvider";

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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="cursor-pointer"
            >
              <g fill="none" fillRule="evenodd">
                <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="#000"
                  d="M5 9a7 7 0 0 1 14 0v3.764l1.822 3.644A1.1 1.1 0 0 1 19.838 18h-3.964a4.002 4.002 0 0 1-7.748 0H4.162a1.1 1.1 0 0 1-.984-1.592L5 12.764zm5.268 9a2 2 0 0 0 3.464 0zM12 4a5 5 0 0 0-5 5v3.764a2 2 0 0 1-.211.894L5.619 16h12.763l-1.17-2.342a2 2 0 0 1-.212-.894V9a5 5 0 0 0-5-5"
                />
              </g>
            </svg>

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
                  style={{backgroundImage: `linear-gradient(to right, rgba(14, 165, 233, 0.6), rgba(14, 165, 233, 0.6)), url(${city})`,}}
                >
                  <div className="flex items-start space-x-2 text-white ">
                    <img
                      src={profil}
                      alt="account"
                      className="w-8 rounded-full cursor-pointer"
                    />
                    <div className="text-xs">
                      <p className="font-semibold">Rafa</p>
                      <p>{User?.role}</p>
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
