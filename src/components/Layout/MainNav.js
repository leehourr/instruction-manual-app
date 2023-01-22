import React from "react";
import { NavLink, Link } from "react-router-dom";

import reading from "../../assets/reading.gif";
import search from "../../assets/search_icon.svg";

const MainNav = () => {
  return (
    <div className="flex w-[90%] font-mono align-middle text-white text-s sm:text-xl sm:w-[80%] mt-4 mb-6 sm:mt-6 sm:mb-14 mx-auto items-center justify-between">
      <img
        className="w-14 sm:w-24 sm:h-24 rounded-lg self-center object-center"
        src={reading}
        alt="cat_logo"
      />
      <nav className=" self-center flex">
        <ul className="flex font-bold space-x-6">
          <li>
            <NavLink></NavLink>
          </li>
          <li className="self-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-pink-400" : "text-white"
              }
              end
            >
              Manuals
            </NavLink>
          </li>
          <li className="self-center">
            <NavLink
              to="/upload-manual"
              className={({ isActive }) =>
                isActive ? "text-pink-400" : "text-white"
              }
            >
              Your manuals
            </NavLink>
          </li>
          <li className="flex relative self-center">
            <span className="text-gray-400 w-4 absolute top-[0.6rem] left-4">
              <img src={search} alt="search" />
            </span>
            <input
              className="w-96 align-middle h-9 font-sans pl-10 bg-zinc-800 font-normal self-center  rounded-lg outline-none caret-pink-600  border-b-4 border-b-transparent focus:border-b-pink-400"
              type="search"
              name="search"
              placeholder="Search manual"
            />
          </li>
          <li className="self-center">
            <button className="">
              <Link
                to="/login"
                className="ml-16 px-2 self-center sm:px-4 font-bold rounded-lg shadow-lg bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:shadow-pink-500 active:shadow-pink-500 "
              >
                Login
              </Link>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
