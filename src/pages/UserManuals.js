import React, { Suspense } from "react";
import YourManuals from "../components/Manual/YourManuals";
import { defer, useLoaderData, Await, useRouteError } from "react-router-dom";
import { getYourManuals, getToken } from "../utils/api";
import cat_what from "../assets/cat-what.gif";

const UserManuals = () => {
  const loadedData = useLoaderData();
  // console.log("upload page");

  // console.log(loadedData.Manuals);
  // const err = useRouteError();
  // console.log(err);

  return (
    <>
      <div className="text-white text-center  w-[80%] sm:w-[70%] mx-auto">
        <h1 className="mb-2  font-mono text-2xl sm:text-4xl font-bold uppercase">
          Your manuals
        </h1>
        <button className="rounded-lg transition-all duration-100 font-bold tracking-wide px-4 shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 hover:bg-cyan-300   hover:text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 text-cyan-300 border-2 p-2 border-cyan-300">
          Upload manual
        </button>
        <div className="mx-auto w-24 h-1 mt-4 mb-8 sm:mt-6 sm:mb-10 bg-zinc-300 rounded-full"></div>
      </div>
      <Suspense
        fallback={
          <img
            className="mx-auto w-[70%] sm:w-[20%]"
            src={cat_what}
            alt="Loading..."
          />
        }
      >
        <Await
          resolve={loadedData.Manuals}
          // errorElement={() => {
          //   <p className="text-white font-bold text-s sm:text-lg text-center ">
          //     Error loading manuals.
          //   </p>;
          // }}
        >
          {(loadedData) => <YourManuals manuals={loadedData.manuals} />}
        </Await>
      </Suspense>
    </>
  );
};

export default UserManuals;

export const loader = async () => {
  const getId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("uid="))
    ?.split("=")[1];
  const uid = { user_id: getId }; // console.log("in aciton");
  // console.log(uid);
  // const manuals = await getYourManuals(uid);
  // console.log(manuals);
  return defer({
    Manuals: getYourManuals(uid),
  });
};
