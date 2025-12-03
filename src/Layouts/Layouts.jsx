import { Navbar } from "./Navbar";
import { Footers } from "./Footers";
import { SideBar } from "./SideBar";
import { Outlet } from "react-router";

export const Layouts = () => {
  return (
    <div className="w-full flex min-h-screen">
      <SideBar />
      <div className="w-full flex flex-col  ">
        <Navbar />
        <div className=" flex-1 p-6 overflow-y-auto ">
          <Outlet />
        </div>
        <Footers />
      </div>
    </div>
  );
};
