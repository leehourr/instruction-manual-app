import React from "react";

const Card = ({ created_at, uploaded_by, img, name, desc }) => {
  const date = new Date(created_at);
  const dateFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  });
  //console.log(dateFormat.format(date));
  return (
    <div className=" my-3 sm:my-4 w-72 font-bold sm:w-[24rem] h-full rounded-xl flex flex-col items-center justify-center text-center mx-auto cursor-pointer bg-[#2a2e35]">
      <div className="w-full h-72">
        <img
          className="mx-auto w-full h-full self-start object-fit rounded-t-xl mb-2"
          src={img}
          alt="manual"
        />
      </div>

      <div className="mx-3 my-4 sm:my-6">
        <h1 className="font-mono font-bold  text-xl space-x-2 whitespace-pre-wrap  ">
          {name}
        </h1>
        <h1 className="font-bold text-s text-pink-400">{uploaded_by}</h1>
        <span className="text-zinc-200">{dateFormat.format(date)}</span>
      </div>
      <div className="flex items-center justify-center py-4 w-full hover:bg-zinc-600 rounded-b-xl">
        <button>Download</button>
      </div>
    </div>
  );
};

export default Card;
