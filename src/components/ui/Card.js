import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import download from "../../assets/download.svg";
import user from "../../assets/user.svg";
import { loader } from "../../pages/Home";
import { getPendingManuals } from "../../utils/api";
import { LoadingStimulate } from "../../utils/LoadingStimulate";

const Card = ({
  created_at,
  uploaded_by,
  id,
  img,
  name,
  desc,
  status,
  isPending,
}) => {
  const [update, setUpdate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const date = new Date(created_at);
  const dateFormat = new Intl.DateTimeFormat("en-us", {
    dateStyle: "medium",
  });

  const approveHandler = async () => {
    // console.log(id);
    // console.log("asd");
    setIsLoading(true);
    setUpdate("Approving...");
    const update = { status: "approved", id: id };
    const res = await getPendingManuals(update);
    // console.log(res);
    if (res.status === 204) {
      await LoadingStimulate(2000);
      setIsLoading(false);
      setIsLoading(false);
      setUpdate("Approved ✔");
      // await LoadingStimulate(300);
      navigate("/pending-manuals");
      // setUpdate("");
    }
  };

  const rejectHandler = async () => {
    // console.log(id);
    // console.log("asd");
    setIsLoading(true);
    setUpdate("Rejecting...");
    const update = { status: "rejected", id: id };
    const res = await getPendingManuals(update);
    // console.log(res);
    if (res.status === 204) {
      await LoadingStimulate(2000);
      setIsLoading(false);
      setIsLoading(false);
      setUpdate("Rejected ❌");
      // await LoadingStimulate(300);
      navigate("/pending-manuals");
      // setUpdate("");
    }
  };
  // console.log(status);

  // const isPending = role === "admin" && status === "pending";
  //console.log(dateFormat.format(date));
  return (
    <div
      className={`${
        isLoading ? "bg-zinc-700" : ""
      } " my-3 sm:my-4 overflow-hidden bg-zinc-800 w-[20rem] hover:scale-110 transition-all duration-150 font-bold sm:w-[22rem]  h-full rounded-xl flex flex-col items-center justify-center text-left mx-auto 2xl:mx-[4px] cursor-pointer bg-zinc-800"`}
    >
      {update && (
        <p
          className={`${
            update === "Rejecting..." ? " bg-red-400" : " bg-cyan-300"
          } " sticky animate-pulse transition-all duration-100 top-0 z-50 h-8 w-full text-zinc-600 text-lg text-center mx-auto"`}
        >
          {update}
        </p>
      )}
      <div className="w-full h-72">
        <img
          className={`${
            isLoading ? "blur-sm" : ""
          } " mx-auto w-full h-full text-center  self-start object-fit rounded-t-xl mb-2"`}
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
        <div className="flex items-center gap-x-2 w-full h-12 bg-zinc-700 rounded-b-xl">
          <button
            onClick={approveHandler}
            className="text-cyan-300 w-full h-full hover:bg-cyan-300 hover:text-zinc-700"
          >
            Approve
          </button>
          <button
            onClick={rejectHandler}
            className="text-red-400 w-full h-full py-2 sm:py-4 hover:bg-red-400 hover:text-zinc-700"
          >
            Reject
          </button>
        </div>
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
