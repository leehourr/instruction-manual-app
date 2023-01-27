import React from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import Logout from "../components/Auth/Logout";
import { signOut } from "../utils/api";

const Profile = () => {
  const param = useParams();
  // console.log(param.name);
  const name = param.name;
  const email = document.cookie
    .split("; ")
    ?.find((row) => row.startsWith("email"))
    .split("=")[1];
  const role = document.cookie
    .split("; ")
    ?.find((row) => row.startsWith("role"))
    .split("=")[1];
  return (
    <div className="text-white text-center  w-[80%] sm:w-[70%]  mx-auto">
      <h1 className="mb-2 font-mono text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
        {name}
      </h1>
      <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
      <div className="text-left w-[80%] sm:w-[30%] mx-auto">
        <p className="text-s sm:text-xl font-semibold">
          Account Email:
          <span className="font-bold text-cyan-300"> {email}</span>
        </p>
        <p className="mt-2 text-s sm:text-xl font-semibold">
          Role:
          <span className="font-bold uppercase text-cyan-300"> {role}</span>
        </p>
        <div className="text-right mt-16">
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default Profile;
