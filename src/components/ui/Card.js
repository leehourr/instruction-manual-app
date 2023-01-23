import React from "react";
import download from "../../assets/download.svg";
import user from "../../assets/user.svg";

const Card = ({ created_at, uploaded_by, img, name, desc }) => {
  const date = new Date(created_at);
  const dateFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  });
  //console.log(dateFormat.format(date));
  return (
    <div className="my-3 sm:my-4 w-[20rem] hover:scale-105 transition-all duration-150 font-bold sm:w-[22rem]  h-full rounded-xl flex flex-col items-center justify-center text-left mx-auto 2xl:mx-[4px] cursor-pointer bg-[#2a2e35]">
      <div className="w-full h-72">
        <img
          className="mx-auto w-full h-full self-start object-fit rounded-t-xl mb-2"
          src={img}
          alt="manual"
        />
      </div>

      <div className="w-full ml-12 my-3 sm:my-6">
        <h1 className="font-mono font-bold  text-xl space-x-2 whitespace-pre-wrap  ">
          {name}
        </h1>
        <div className="flex gap-x-[0.3rem] items-center">
          <img className="w-[1.1rem]" src={user} alt="" />{" "}
          <h1 className="font-bold text-s text-pink-400">{uploaded_by}</h1>
        </div>
        <span className="text-zinc-200">{dateFormat.format(date)}</span>
      </div>
      <button className="flex items-center justify-center gap-x-2 py-2 sm:py-4 w-full hover:bg-zinc-600 rounded-b-xl">
        <img className="w-[1.2rem]" src={download} alt="" />
        <span>Download</span>
      </button>
    </div>
  );
};

export default Card;
