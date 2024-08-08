import React from "react";

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="text-gray-600 p-1 bg-gray-100 min-h-screen text-lg  bg-gradient-to-r from-indigo-200 to-teal-50 ">
      <Navbar />
      <main className="pt-28 md:pt-32">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
