import React, { Suspense } from "react";
import ManualItems from "../components/Manual/ManualItems";
import { defer, useLoaderData, Await } from "react-router-dom";
import { getManuals } from "../utils/api.js";

import cat_what from "../assets/cat-what.gif";
import Card from "../components/ui/Card";

const Home = () => {
  const loadedData = useLoaderData();

  return (
    <>
      <div className="text-white text-center  w-[80%] sm:w-[70%]  mx-auto">
        <h1 className="mb-2 font-mono  text-2xl sm:text-4xl font-bold uppercase">
          Instruction Manuals
        </h1>
        <p className="text-s sm:text-xl text-zinc-300  ">
          We provide instructions or guidelines on how to perform an activity
          and serves as a reference book on the activity
        </p>
        <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
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
          errorElement={<p className="text-white ">Error loading contacts.</p>}
        >
          {(loadedData) => <ManualItems manuals={loadedData.manual} />}
        </Await>
      </Suspense>
    </>
  );
};

export default Home;

export const loader = async () => {
  return defer({
    Manuals: getManuals(),
  });
};
