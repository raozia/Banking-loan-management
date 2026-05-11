import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import SideBar from "../SideBar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex flex-col  h-screen overflow-y-auto flex-1">
        <NavBar />
        <main className="max-w-10/12 w-full mx-auto  bg-white shadow-xl rounded-md mt-5 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
