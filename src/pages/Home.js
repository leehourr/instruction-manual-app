import React, { useEffect, useMemo, Suspense, useState } from "react";
import ManualItems from "../components/Manual/ManualItems";
import { defer, useLoaderData, useNavigate, Await } from "react-router-dom";
import { getManuals } from "../utils/api.js";
import ReactDOM from "react-dom";
import { Backdrop } from "../components/ui/Backdrop";

import cat_what from "../assets/cat-what.gif";
import glasses from "../assets/2ea.png";

const Home = () => {
  const loadedData = useLoaderData();
  const accCreated = useMemo(() => sessionStorage.getItem("signUp"), []);
  const [isNewAcc, setIsNewAcc] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (accCreated) {
      // console.log(accCreated);
      setIsNewAcc(true);
    }
  }, [accCreated]);

  // console.log(loadedData);

  const closeModal = () => {
    sessionStorage.removeItem("signUp");
    setIsNewAcc(false);
  };

  const redirToLogin = () => {
    closeModal();
    navigate("/login");
  };
  return (
    <>
      {isNewAcc &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop")
        )}

      <div className="text-white text-center relative  w-[80%] sm:w-[70%]  mx-auto">
        {isNewAcc &&
          ReactDOM.createPortal(
            <div className="absolute text-white font-bold  w-[80%] sm:w-[50%] xl:w-[40%] h-[60%]  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-zinc-800 z-50">
              <img
                className="w-[80%] sm:w-[60%] mx-auto"
                src={glasses}
                alt="img"
              />
              <div className="px-4 mt-10 sm:mt-12 text-center text-s sm:text-xl">
                <p>
                  <span className="text-cyan-300">Cool cool</span>, your account
                  have been created!
                </p>
                <p>
                  you can now start
                  <span
                    onClick={redirToLogin}
                    to="/login"
                    className="text-cyan-300 cursor-pointer px-2 underline hover:bg-cyan-300 hover:text-zinc-800"
                  >
                    log into your account
                  </span>
                  or keep
                  <span
                    onClick={closeModal}
                    className="underline px-2 cursor-pointer text-cyan-300 hover:bg-cyan-300 hover:text-zinc-800"
                  >
                    browsing the manuals
                  </span>
                </p>
              </div>
            </div>,
            document.getElementById("overlay")
          )}
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
          errorElement={
            <p className="text-white font-bold text-s sm:text-lg text-center ">
              Error loading manuals.
            </p>
          }
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
