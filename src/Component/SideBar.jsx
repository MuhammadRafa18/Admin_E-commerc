import React, { useContext, useState } from "react";
import { AuthContext } from "../Store/AuthContext";
import { Link, useNavigate } from "react-router";
import { PagesContext } from "../Store/PagesProvider";
import { UseAction } from "../hooks/UseAction";

export const SideBar = () => {
  const [openData, setOpenData] = useState(false);
  const [openHome, setOpenHome] = useState(false);
  const [openFaq, setopenFaq] = useState(false);
  const { User } = useContext(AuthContext);
  const { isSidebarOpen, setIsSidebarOpen } = useContext(PagesContext);
  const navigate = useNavigate();
  return (
    <>
      {isSidebarOpen && (
        <aside className="w-64 min-h-screen p-4 md:flex flex-col  bg-sidebar  text-black  hidden ">
          <nav className="flex-1 space-y-2 md:space-y-4 lg:space-y-6">
            <div className="flex items-center px-3   space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 md:w-6 lg:w-8"
                viewBox="0 0 512 512"
              >
                <path
                  fill="#FE942A"
                  d="M204 240H68a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36m240 0H308a36 36 0 0 1-36-36V68a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36M204 480H68a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36m240 0H308a36 36 0 0 1-36-36V308a36 36 0 0 1 36-36h136a36 36 0 0 1 36 36v136a36 36 0 0 1-36 36"
                />
              </svg>
              <span className="text-base md:text-xl lg:text-2xl font-semibold">
                Arliva
              </span>
            </div>
            <div className="flex px-3 items-center text-black hover:bg-hover hover:text-white rounded group">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  className="stroke-black group-hover:stroke-white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M3 6.75c0-1.768 0-2.652.55-3.2C4.097 3 4.981 3 6.75 3s2.652 0 3.2.55c.55.548.55 1.432.55 3.2s0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55s-2.652 0-3.2-.55C3 9.403 3 8.519 3 6.75m0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55s2.652 0 3.2.55c.55.548.55 1.432.55 3.2s0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55s-2.652 0-3.2-.55C3 19.91 3 19.026 3 17.258M13.5 6.75c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55s2.652 0 3.2.55c.55.548.55 1.432.55 3.2s0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55s-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2m0 10.507c0-1.768 0-2.652.55-3.2c.548-.55 1.432-.55 3.2-.55s2.652 0 3.2.55c.55.548.55 1.432.55 3.2s0 2.652-.55 3.2c-.548.55-1.432.55-3.2.55s-2.652 0-3.2-.55c-.55-.548-.55-1.432-.55-3.2"
                />
              </svg>
              <button
                onClick={() => navigate(`/`)}
                className="text-sm lg:text-base px-3 py-2"
              >
                Dashboard
              </button>
            </div>
            <button
              onClick={() => setOpenData(!openData)}
              className="flex justify-between  items-center w-full px-2.5 py-2 text-sm hover:bg-hover hover:text-white rounded transition group"
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-black group-hover:fill-white"
                    d="M12 20q-3.506 0-5.753-.893T4 16.807V7q0-1.246 2.34-2.123T12 4t5.66.877T20 7v9.808q0 1.405-2.247 2.299T12 20m0-11.11q2.148 0 4.33-.599q2.184-.599 2.612-1.305q-.41-.744-2.57-1.365T12 5q-2.179 0-4.366.599t-2.615 1.31q.408.75 2.576 1.366T12 8.891m0 5.032q1.03 0 2.025-.1t1.901-.297t1.685-.491T19 12.37V8.275q-.611.37-1.39.664q-.777.294-1.684.49q-.907.198-1.901.298t-2.025.1q-1.07 0-2.079-.11t-1.906-.306t-1.663-.482T5 8.275v4.096q.587.37 1.352.654t1.663.482q.896.197 1.906.307t2.079.109M12 19q1.285 0 2.443-.146t2.082-.414t1.57-.641t.905-.805v-3.623q-.611.37-1.39.664q-.777.294-1.684.491t-1.901.297t-2.025.1q-1.07 0-2.079-.11t-1.906-.306t-1.663-.482q-.766-.284-1.352-.654V17q.26.452.903.812t1.566.627t2.085.415T12 19"
                  />
                </svg>
                <span>Data</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="24"
                viewBox="0 0 12 24"
                className={`${openData ? "rotate-90" : "rotate-0"}`}
              >
                <defs>
                  <path
                    id="1"
                    className="fill-black group-hover:fill-white"
                    d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"
                  />
                </defs>
                <use
                  fillRule="evenodd"
                  href="#1"
                  transform="rotate(-180 5.02 9.505)"
                />
              </svg>
            </button>
            {openData && (
              <div className="text-xs ml-4 mt-2 space-y-2 animate-fadeIn">
                <Link
                  to="/ProdukPage"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline "
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#000"
                      d="M6.923 1.378a3 3 0 0 1 2.154 0l4.962 1.908a1.5 1.5 0 0 1 .961 1.4v6.626a1.5 1.5 0 0 1-.961 1.4l-4.962 1.909a3 3 0 0 1-2.154 0l-4.961-1.909a1.5 1.5 0 0 1-.962-1.4V4.686a1.5 1.5 0 0 1 .962-1.4zm1.795.933a2 2 0 0 0-1.436 0l-1.384.533l5.59 2.116l1.948-.834zM14 4.971L8.5 7.33v6.428q.11-.028.218-.07l4.962-1.908a.5.5 0 0 0 .32-.467zm-6.5 8.786V7.33L2 4.972v6.34a.5.5 0 0 0 .32.467l4.962 1.908q.107.042.218.07M2.564 4.126L8 6.456l2.164-.928l-5.667-2.146z"
                    />
                  </svg>
                  <span>Product</span>
                </Link>
                <Link
                  to="/Categories"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="#000" strokeWidth="1.5">
                      <path d="M4.979 9.685C2.993 8.891 2 8.494 2 8s.993-.89 2.979-1.685l2.808-1.123C9.773 4.397 10.767 4 12 4s2.227.397 4.213 1.192l2.808 1.123C21.007 7.109 22 7.506 22 8s-.993.89-2.979 1.685l-2.808 1.124C14.227 11.603 13.233 12 12 12s-2.227-.397-4.213-1.191z" />
                      <path d="m5.766 10l-.787.315C2.993 11.109 2 11.507 2 12s.993.89 2.979 1.685l2.808 1.124C9.773 15.603 10.767 16 12 16s2.227-.397 4.213-1.191l2.808-1.124C21.007 12.891 22 12.493 22 12s-.993-.89-2.979-1.685L18.234 10" />
                      <path d="m5.766 14l-.787.315C2.993 15.109 2 15.507 2 16s.993.89 2.979 1.685l2.808 1.124C9.773 19.603 10.767 20 12 20s2.227-.397 4.213-1.192l2.808-1.123C21.007 16.891 22 16.494 22 16c0-.493-.993-.89-2.979-1.685L18.234 14" />
                    </g>
                  </svg>
                  <span>Categories</span>
                </Link>
                <Link
                  to="/Type"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M15.62 21.12a3 3 0 0 1-4.24 0L3.05 13C2.45 12.45 2 11.63 2 10.75V6a3 3 0 0 1 3-3h4.75c.88 0 1.7.45 2.25 1.05l8.07 8.38a3 3 0 0 1 0 4.24zm-.71-.71l4.45-4.45c.78-.78.78-2.05 0-2.83l-8.25-8.55C10.78 4.2 10.3 4 9.75 4l-4.78-.03C3.87 3.97 3 4.9 3 6v4.75c0 .55.2 1.03.58 1.36l8.5 8.3c.78.78 2.05.78 2.83 0M6.5 5A2.5 2.5 0 0 1 9 7.5A2.5 2.5 0 0 1 6.5 10A2.5 2.5 0 0 1 4 7.5A2.5 2.5 0 0 1 6.5 5m0 1A1.5 1.5 0 0 0 5 7.5A1.5 1.5 0 0 0 6.5 9A1.5 1.5 0 0 0 8 7.5A1.5 1.5 0 0 0 6.5 6"
                    />
                  </svg>
                  <span>Type</span>
                </Link>
                {User.role === "super_admin" ? (
                  <Link
                    to="/UserAdmin"
                    className="flex items-center space-x-2 px-2 py-1  hover:underline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="#000"
                        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2m0 7c2.67 0 8 1.33 8 4v3H4v-3c0-2.67 5.33-4 8-4m0 1.9c-2.97 0-6.1 1.46-6.1 2.1v1.1h12.2V17c0-.64-3.13-2.1-6.1-2.1"
                      />
                    </svg>
                    <span>User</span>
                  </Link>
                ) : null}
              </div>
            )}
            <button
              onClick={() => setOpenHome(!openHome)}
              className="flex justify-between  items-center w-full px-3 py-2 text-sm hover:bg-hover hover:text-white rounded transition group"
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-black group-hover:fill-white"
                    d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77"
                  />
                </svg>
                <span>Home</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="24"
                viewBox="0 0 12 24"
                className={`${openHome ? "rotate-90" : "rotate-0"}`}
              >
                <defs>
                  <path
                    id="2"
                    className="fill-black group-hover:fill-white"
                    d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"
                  />
                </defs>
                <use
                  fillRule="evenodd"
                  href="#2"
                  transform="rotate(-180 5.02 9.505)"
                />
              </svg>
            </button>
            {openHome && (
              <div className="ml-4 mt-2 space-y-2 text-xs">
                <Link
                  to="/Banner"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#000"
                      d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h12.769q.69 0 1.153.463T20 5.616v12.769q0 .69-.462 1.153T18.384 20zm0-1h12.769q.23 0 .423-.192t.192-.424V5.616q0-.231-.192-.424T18.384 5H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192M7.5 16.5h9.154l-2.827-3.77l-2.615 3.308l-1.75-2.115zM5 19V5z"
                    />
                  </svg>
                  <span>Banner</span>
                </Link>
                <Link
                  to="/Result"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="#000"
                      d="M7.398 12.809a1.04 1.04 0 0 0 1.204-.003c.178-.13.313-.31.387-.518l.447-1.373a2.34 2.34 0 0 1 1.477-1.479l1.391-.45a1.045 1.045 0 0 0-.044-1.98l-1.375-.448a2.34 2.34 0 0 1-1.48-1.477l-.452-1.388a1.044 1.044 0 0 0-1.973.017l-.457 1.4a2.34 2.34 0 0 1-1.44 1.45l-1.39.447a1.045 1.045 0 0 0 .016 1.974l1.374.445a2.33 2.33 0 0 1 1.481 1.488l.452 1.391c.072.204.206.38.382.504m.085-7.415l.527-1.377l.44 1.377a3.33 3.33 0 0 0 2.117 2.114l1.406.53l-1.382.447a3.34 3.34 0 0 0-2.115 2.117l-.523 1.378l-.449-1.379a3.34 3.34 0 0 0-.8-1.31a3.4 3.4 0 0 0-1.312-.812l-1.378-.522l1.386-.45a3.36 3.36 0 0 0 1.29-.813a3.4 3.4 0 0 0 .793-1.3m6.052 11.457a.806.806 0 0 0 1.226-.398l.248-.762a1.1 1.1 0 0 1 .26-.42c.118-.12.262-.208.42-.26l.772-.252a.8.8 0 0 0-.023-1.52l-.764-.25a1.08 1.08 0 0 1-.68-.678l-.252-.773a.8.8 0 0 0-1.518.01l-.247.762a1.07 1.07 0 0 1-.665.679l-.773.252a.8.8 0 0 0 .008 1.518l.763.247c.16.054.304.143.422.261c.119.119.207.263.258.422l.253.774a.8.8 0 0 0 .292.388m-.913-2.793L12.443 14l.184-.064a2.11 2.11 0 0 0 1.3-1.317l.058-.178l.06.181a2.08 2.08 0 0 0 1.316 1.316l.195.063l-.18.06a2.08 2.08 0 0 0-1.317 1.32l-.059.181l-.058-.18a2.08 2.08 0 0 0-1.32-1.323"
                    />
                  </svg>
                  <span>Result Product</span>
                </Link>
              </div>
            )}
            <button
              onClick={() => navigate(`/About`)}
              className="flex justify-between  items-center w-full px-3 py-2 text-sm hover:bg-hover hover:text-white rounded transition group"
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-black group-hover:fill-white"
                    d="M11.5 16.5h1V11h-1zm.5-6.923q.262 0 .439-.177t.176-.439t-.177-.438T12 8.346t-.438.177t-.177.439t.177.438t.438.177M12.003 21q-1.867 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
                <span>About</span>
              </div>
            </button>
            <button
              onClick={() => setopenFaq(!openFaq)}
              className="flex justify-between  items-center w-full px-3 py-2 text-sm hover:bg-hover hover:text-white rounded transition group"
            >
              <div className="flex items-center space-x-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    className="fill-black group-hover:fill-white"
                    d="M12.028 17.23q.332 0 .56-.228t.228-.56t-.23-.56q-.228-.228-.56-.228t-.56.229t-.227.56q0 .332.228.56q.23.228.561.228m-.517-3.312h.966q.038-.652.245-1.06q.207-.407.851-1.04q.67-.669.996-1.199t.327-1.226q0-1.182-.83-1.884q-.831-.702-1.966-.702q-1.079 0-1.832.586q-.753.587-1.103 1.348l.92.381q.24-.546.687-.965q.447-.42 1.29-.42q.972 0 1.42.534q.449.534.449 1.174q0 .52-.281.928q-.28.409-.73.822q-.87.802-1.14 1.36t-.269 1.363M12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
                  />
                </svg>
                <span>Faq</span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="24"
                viewBox="0 0 12 24"
                className={`${openFaq ? "rotate-90" : "rotate-0"}`}
              >
                <defs>
                  <path
                    id="4"
                    className="fill-black group-hover:fill-white"
                    d="m7.588 12.43l-1.061 1.06L.748 7.713a.996.996 0 0 1 0-1.413L6.527.52l1.06 1.06l-5.424 5.425z"
                  />
                </defs>
                <use
                  fillRule="evenodd"
                  href="#4"
                  transform="rotate(-180 5.02 9.505)"
                />
              </svg>
            </button>
            {openFaq && (
              <div className="ml-4 mt-2 space-y-2 text-xs">
                <Link
                  to="/Faq"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#000"
                      d="M46.5 0v139.6h23.3c0-23.3 0-69.8 23.3-93.1c23.2-23.3 46.5-23.3 69.8-23.3h46.5v395.6c0 34.9-11.6 69.8-46.5 69.8h-22.8l-.5 23.2h232.7v-23.3H349c-34.9 0-46.5-34.9-46.5-69.8V23.3H349c23.3 0 46.5 0 69.8 23.3s23.3 69.8 23.3 93.1h23.3V0z"
                    />
                  </svg>
                  <span>Title Faq</span>
                </Link>
                <Link
                  to="/DetailFaq"
                  className="flex items-center space-x-2 px-2 py-1  hover:underline"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    >
                      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092a10 10 0 1 0-4.777-4.719" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3m.08 4h.01" />
                    </g>
                  </svg>
                  <span>Detail Faq</span>
                </Link>
              </div>
            )}
            <div className="flex items-center px-3.5 text-black hover:bg-hover hover:text-white rounded group">
              <svg
                className="group"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  className="fill-black group-hover:fill-white"
                  d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m-9-1a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M18 6H4.27l2.55 6H15c.33 0 .62-.16.8-.4l3-4c.13-.17.2-.38.2-.6a1 1 0 0 0-1-1m-3 7H6.87l-.77 1.56L6 15a1 1 0 0 0 1 1h11v1H7a2 2 0 0 1-2-2a2 2 0 0 1 .25-.97l.72-1.47L2.34 4H1V3h2l.85 2H18a2 2 0 0 1 2 2c0 .5-.17.92-.45 1.26l-2.91 3.89c-.36.51-.96.85-1.64.85"
                />
              </svg>
              <button
                onClick={() => navigate(`/Order`)}
                className="text-sm lg:text-base px-3 py-2"
              >
                Order
              </button>
            </div>
          </nav>
        </aside>
      )}
    </>
  );
};
