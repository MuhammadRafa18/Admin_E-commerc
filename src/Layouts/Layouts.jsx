import { Navbar } from "../Component/Navbar";
import { Footers } from "../Component/Footers";
import { SideBar } from "../Component/SideBar";
import { Outlet } from "react-router";

export const Layouts = () => {
  return (
    <div className="w-full flex min-h-screen ">
      <SideBar />
      <div className="flex flex-col flex-1 min-w-0  ">
        <Navbar />
        <div className="flex-1 px-10 py-6 overflow-y-auto ">
          <Outlet />
        </div>
        <Footers />
      </div>
    </div>
  );
};
