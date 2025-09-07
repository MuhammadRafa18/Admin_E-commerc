import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ProdukContext } from '../Context/ProdukProvider';

export const AdminLayout = ({children}) => {
  const [open, setOpen] = useState(true);
  const { isLogin, setIslogin,loading } = useContext(ProdukContext)
  const location = useLocation();
 const navigate = useNavigate();
  const handleLogout = () => {
  if (window.confirm("Mau log out?")) {
    setIslogin(null);   // kosongkan session
    navigate("/Login"); // arahkan ke login
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
            onClick={() => setOpen(!open)}
            className="flex justify-between  items-center w-full px-3 py-2 hover:bg-gray-700 rounded transition"
          >
            Page
            <span className={`transform transition-transform ${open ? "rotate-180" : "rotate-0"}`}>
              ▼
            </span>
          </button>
          {open && (
            <div className="ml-4 mt-2 space-y-2 animate-fadeIn">
              <Link to="/ProdukPage" className="block px-2 py-1  hover:underline">
                Produk
              </Link>
              {isLogin === "SuperAdmin" ?
                <Link to="/User" className="block px-2 py-1  hover:underline">
                User
              </Link>
               : null}
            </div>
          )}
        </nav>
        <button onClick={handleLogout}>log out</button>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
