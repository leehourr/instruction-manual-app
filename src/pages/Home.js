import React, {
  useEffect,
  useMemo,
  Suspense,
  useState,
  useContext,
} from "react";
import ManualItems from "../components/Manual/ManualItems";
import { defer, useLoaderData, useNavigate, Await } from "react-router-dom";
import { getManuals } from "../utils/api.js";
import ReactDOM from "react-dom";
import { Backdrop } from "../components/ui/Backdrop";
import AuthContext from "../Context/Auth-context";

import cat_what from "../assets/cat-what.gif";
import glasses from "../assets/2ea.png";

const Home = () => {
  const authCtx = useContext(AuthContext);
  console.log(authCtx.userData);
  const loadedData = useLoaderData();

  const navigate = useNavigate();
  return (
    <>
      <div className="text-white text-center relative  w-[80%] sm:w-[70%]  mx-auto">
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
            <ManualItems manuals={loadedData.manual} isPending={false} />
          )}
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
