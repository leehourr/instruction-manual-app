import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../components/Layout/MainNav";

const Layout = () => {
  return (
    <div className="w-full h-screen">
      <MainNav />
      <Outlet />
    </div>
  );
};

export default Layout;
