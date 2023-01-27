import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { checkCookieExists } from "../../utils/api";

import reading from "../../assets/reading.gif";
import search from "../../assets/search_icon.svg";
import user from "../../assets/user.svg";

const MainNav = () => {
  const navigate = useNavigate();
  const name = document?.cookie
    .split("; ")
    ?.find((row) => row?.startsWith("name"))
    ?.split("=")[1];

  const role =
    document?.cookie
      .split("; ")
      ?.find((row) => row?.startsWith("role"))
      ?.split("=")[1] || "";

  const navigateToLogin = () => {
    navigate("/login");
  };

  const navigateToProfile = () => {
    navigate(`/${name}`);
  };
  return (
    <div className="flex w-[90%] font-mono align-middle text-white text-s sm:text-xl sm:w-[80%] mt-4 mb-6 sm:mt-6 sm:mb-14 mx-auto items-center justify-between">
      <img
        className="w-14 h-14 sm:w-24 sm:h-24 rounded-full hover:w-60 hover:h-60 transition-all duration-100 self-center object-center"
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
                isActive ? "text-cyan-300" : "text-white"
              }
              end
            >
              Manuals
            </NavLink>
          </li>
          <li className="self-center">
            {(role === "user" || role === "") && (
              <NavLink
                to="/your-manuals"
                className={({ isActive }) =>
                  isActive ? "text-cyan-300" : "text-white"
                }
              >
                Your manuals
              </NavLink>
            )}
          </li>
          <li className="self-center">
            {role === "admin" && (
              <NavLink
                to="/pending-manuals"
                className={({ isActive }) =>
                  isActive ? "text-cyan-300" : "text-white"
                }
              >
                Pending manuals
              </NavLink>
            )}
          </li>
          <li className="flex relative self-center">
            <span className="text-gray-400 w-4 absolute top-[0.6rem] left-4">
              <img src={search} alt="search" />
            </span>
            <input
              className="w-96 align-middle h-9 font-sans pl-10 bg-zinc-800 font-normal self-center  rounded-lg outline-none caret-cyan-300  border-b-2 border-b-transparent focus:border-b-cyan-300"
              type="search"
              name="search"
              placeholder="Search manual"
            />
          </li>

          <li className="group self-center ml-24 cursor-pointer ">
            {!checkCookieExists("token") ? (
              <button
                onClick={navigateToLogin}
                className=" px-2 self-center rounded-md h-full sm:px-4 font-bold rounded-s shadow-lg bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 hover:shadow-pink-500 active:shadow-pink-500 "
              >
                Login
              </button>
            ) : (
              <div className="relative w-14 h-14  text-cyan-300 font-semibold sm:w-24 sm:h-24">
                <img
                  onClick={navigateToProfile}
                  className="stroke-pink-500 fill-pink-500 w-full h-full shadow-2xl rounded-full  group-hover:shadow-cyan-600 group-active:shadow-cyan-600 "
                  src={user}
                  alt=""
                />
                <NavLink
                  to={`/${name}`}
                  className={({ isActive }) =>
                    isActive
                      ? "absolute top-[80%] text-zinc-900 px-2 py-1 bg-cyan-300  shadow-cyan-600 rounded-md sm:px-4 font-bold rounded-s shadow-lg border-2 border-cyan-300"
                      : "absolute top-[80%] bg-zinc-900 px-2 py-1 group-hover:shadow-cyan-300 group-hover:bg-cyan-300 group-hover:text-zinc-900  group-active:shadow-cyan-600 w-full rounded-md sm:px-4 font-bold rounded-s shadow-lg border-2 border-cyan-300 "
                  }
                >
                  {name}
                </NavLink>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
