import React from "react";
import download from "../../assets/download.svg";
import user from "../../assets/user.svg";

const Card = ({ created_at, uploaded_by, img, name, desc, status }) => {
  const date = new Date(created_at);
  const dateFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  });

  // console.log(status);

  const role = document?.cookie
    .split("; ")
    ?.find((row) => row?.startsWith("role"))
    ?.split("=")[1];

  const isPending = role === "admin" && status === "pending";
  //console.log(dateFormat.format(date));
  return (
    <div className="my-3 sm:my-4 overflow-hidden w-[20rem] hover:scale-110 active:scale-125 transition-all duration-150 font-bold sm:w-[22rem]  h-full rounded-xl flex flex-col items-center justify-center text-left mx-auto 2xl:mx-[4px] cursor-pointer bg-zinc-800">
      <div className="w-full h-72">
        <img
          className="mx-auto w-full h-full text-center  self-start object-fit rounded-t-xl mb-2"
          src={img}
          alt="no_image"
        />
      </div>

      <div className="w-full ml-12 my-3 sm:my-6">
        <h1 className="font-Klavika font-bold  text-xl space-x-2 whitespace-pre-wrap  ">
          {name}
        </h1>
        <div className="flex gap-x-[0.3rem] items-center">
          <img className="w-[1.1rem]" src={user} alt="" />
          <h1 className="font-bold text-s text-cyan-300">{uploaded_by}</h1>
        </div>
        <span className="text-zinc-200">{dateFormat.format(date)}</span>
      </div>
      {isPending ? (
        <button className="flex items-center justify-around gap-x-2 w-full bg-zinc-700 rounded-b-xl">
          <span className="text-cyan-300 w-full py-2 sm:py-4 hover:bg-cyan-300 hover:text-zinc-700">
            Approve
          </span>
          <span className="text-red-400 w-full py-2 sm:py-4 hover:bg-red-400 hover:text-zinc-700">
            Reject
          </span>
        </button>
      ) : (
        <button className="flex items-center justify-center gap-x-2 py-2 sm:py-4 w-full hover:bg-zinc-700 rounded-b-xl">
          <img className="w-[1.2rem]" src={download} alt="" />
          <span>Download</span>
        </button>
      )}
    </div>
  );
};

export default Card;
