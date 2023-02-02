import React from "react";
import { useNavigate } from "react-router-dom";
import pageNotFound from "../assets/404.jpg";

const PageNotFound = () => {
  const navigate = useNavigate();
  const backToHome = () => {
    navigate("/", { replace: true });
  };
  return (
    <div className="w-full sm:h-full overflow-y-hidden mx-auto flex flex-col justify-center sm:justify-start items-center ">
      <div className="flex justify-center w-full sm:h-[50%] text-center mt-16 sm:mt-0">
        <span className="text-[10rem] self-center sm:text-[25rem]  text-cyan-300   ">
          4 
        </span>
        <img
          className="self-center w-1/2 sm:w-1/5  rounded-full"
          src={pageNotFound}
          alt="O"
        />
        <span className="text-[10rem] self-center sm:text-[25rem] text-cyan-300   ">4</span>
      </div>
      <p className="text-center mt-4 sm:mt-0 text-5xl sm:text-[4rem] text-white">
        Page not found
      </p>
      <button
        onClick={backToHome}
        className="rounded-lg mt-12 h-16 align-middle text-2xl sm:text-[2rem] w-[80%] sm:w-1/4 transition-all duration-100 font-bold tracking-wide shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 bg-cyan-300  text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 border-2 p-2 border-cyan-300"
      >
        Back to homepage
      </button>
    </div>
  );
};

export default PageNotFound;
