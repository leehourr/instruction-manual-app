import React from "react";
// import { Link } from "react-router-dom";
import reading from "../../assets/reading.gif";
const Auth = () => {
  return (
    <div className=" w-full h-screen text-white flex flex-col items-center justify-center">
      <img
        className="w-60 h-60 sm:w-72 sm:h-72 rounded-[100%]"
        src={reading}
        alt="reading"
      />
      <h1 className="uppercase my-4 font-bold text-2xl sm:text-3xl">
        Instruction manuals
      </h1>
      <form className="w-full flex flex-col items-center justify-center">
        <input
          className="mb-4 w-[80%] sm:w-1/5 bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-pink-600 border-b-4 border-b-transparent focus:border-b-pink-600"
          type="text"
          placeholder="Email"
          name="email"
          required
        />
        <input
          className="mb-4 w-[80%] sm:w-1/5 bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-pink-600  border-b-4 border-b-transparent focus:border-b-pink-600"
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <button className="w-[80%] mb-4 sm:w-1/5 h-9 rounded-lg bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-pink-500 active:shadow-pink-500  ">
          Login
        </button>
        <p>
          Don't have an account ?
          <span className="text-pink-400 ml-1 font-semibold"> Sign up</span>
        </p>
      </form>
    </div>
  );
};

export default Auth;
