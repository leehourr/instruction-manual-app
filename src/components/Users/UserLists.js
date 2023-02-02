import React, { useEffect, useState } from "react";
import user from "../../assets/user.svg";
import loading from "../../assets/loading.gif";
import { banUser, unbanUser } from "../../utils/api";
import { LoadingStimulate } from "../../utils/LoadingStimulate";
import { useNavigate } from "react-router-dom";

const UserLists = ({ id, email, name, status }) => {
  const [isLoading, setIsloading] = useState(false);
  const [uStatus, setUtatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUtatus(status);
  }, [status]);

  const manageUserHandler = async () => {
    setIsloading(true);
    // console.log(id);
    if (status === "banned") {
      const res = await unbanUser({ user_id: id });
      console.log(res);
      await LoadingStimulate(1500);
      setUtatus("active");
      setIsloading(false);
      navigate("/user-lists")
      return;
    }
    const res = await banUser({ user_id: id });
    console.log(res);
    await LoadingStimulate(1500);
    setUtatus("banned");
    setIsloading(false);
    navigate("/user-lists")
  };
  return (
    <ul className="w-full font-sanserif font-medium flex items-start justify-between my-4 pb-6  text-white space-x-56  mx-auto [&:not(:last-child)]:border-b border-b-cyan-400">
      <li className="w-[10%] sm:w-1/3 flex self-center sm:mr-36">
        <img className="sm:w-[3rem]" src={user} alt="" />
        <div className="ml-4 flex flex-col items-start">
          <h1 className="text-cyan-300 font-semibold text-lg sm:text-3xl">
            {name}
          </h1>
          <p className="text-zinc-300 font-medium">{email}</p>
        </div>
      </li>
      <li
        className={`${
          uStatus === "active" ? "text-cyan-500" : "text-red-400"
        } " text-zinc-800 uppercase font-semibold sm:items-center self-end uppercase"`}
      >
        {uStatus}
      </li>
      <li className="self-end">
        <button
          onClick={manageUserHandler}
          className="sm:w-24 text-white mx-auto rounded-lg transition-all duration-100 font-bold tracking-wide px-4 shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 hover:bg-cyan-300   hover:text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 outline-1 outline-none h-6 align-middle text-center  outline-cyan-300"
        >
          {isLoading ? (
            <img className="w-5 mx-auto" src={loading} alt="loading" />
          ) : (
            <p>{uStatus === "banned" ? "Unban" : "Ban"}</p>
          )}
        </button>
      </li>
    </ul>
  );
};

export default UserLists;
