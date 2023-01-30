import React, { Suspense } from "react";
import { defer, useLoaderData, useNavigate, Await } from "react-router-dom";
import { getPendingManuals } from "../utils/api";
import ManualItems from "../components/Manual/ManualItems";

import cat_what from "../assets/cat-what.gif";

const PendingManuals = () => {
  const loadedData = useLoaderData();

  return (
    <>
      <div className="text-white text-center relative  w-[80%] sm:w-[70%]  mx-auto">
        <h1 className="mb-2 font-mono  text-2xl sm:text-4xl font-bold uppercase">
          Pending Manuals
        </h1>
        <p className="text-s sm:text-xl text-zinc-300  ">
          All these manuals waiting to be approved.
        </p>
        <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
      </div>
      <Suspense
        fallback={
          // <img
          //   className="mx-auto w-[70%] sm:w-[20%]"
          //   src={cat_what}
          //   alt="Loading..."
          // />
          <h1 className="mt-24 font-mono text-center text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
            Loading...
          </h1>
        }
      >
        <Await
          resolve={loadedData.Manuals}
          errorElement={
            <p className="text-white font-bold text-s sm:text-lg text-center ">
              Error loading manuals.
            </p>
          }
        >
          {(loadedData) => (
            <ManualItems
              manuals={loadedData.pending_manuals}
              isPending={true}
            />
          )}
        </Await>
      </Suspense>
      ;
    </>
  );
};

export default PendingManuals;

export const loader = async () => {
  return defer({
    Manuals: getPendingManuals(),
  });
};
