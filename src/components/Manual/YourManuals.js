import React from "react";
import ManualItems from "./ManualItems";

const YourManuals = () => {
  return (
    <div className="text-white text-center  w-[80%] sm:w-[70%] mx-auto">
      <h1 className="mb-2  font-mono text-2xl sm:text-4xl font-bold uppercase">
        Your manuals
      </h1>
      <p className="text-s sm:text-xl text-zinc-300  ">
        You have 3 manuals published.
      </p>
      <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
    </div>
  );
};

export default YourManuals;
