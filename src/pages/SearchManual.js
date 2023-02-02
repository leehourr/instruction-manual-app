import React, { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import FindManual from "../components/Manual/FindManual";
import { searchManual } from "../utils/api";

const SearchManual = () => {
  const data = useLoaderData();
  //   console.log("in page");

  //   console.log(data);
  return (
    <>
      <div className="text-white text-center relative  w-[80%] sm:w-[70%]  mx-auto">
        <h1 className="mb-2 font-mono  text-2xl sm:text-4xl font-bold uppercase">
          Result
        </h1>
        <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
      </div>
      <Suspense
        fallback={
          <h1 className="mt-24 font-mono text-center text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
            Loading...
          </h1>
        }
      >
        <Await
          resolve={data.searchManual}
          errorElement={
            <p className="text-white font-bold text-s sm:text-lg text-center ">
              Error finding manual.
            </p>
          }
        >
          {(data) => <FindManual manual={data} />}
        </Await>
      </Suspense>
    </>
  );
};

export default SearchManual;

export const loader = async ({ params }) => {
  //   console.log("in loader");
  const manual = params.seacrhManual;
  //   console.log(manual);
  return defer({ searchManual: searchManual(`${manual}`) });
};
