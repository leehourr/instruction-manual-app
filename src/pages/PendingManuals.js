import React, { Suspense, useEffect, useState } from "react";
import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";
import { getPendingManuals, checkCookieExists } from "../utils/api";
import PendingManual from "../components/Manual/PendingManual";
import loading from "../assets/loading.gif";

const PendingManuals = () => {
  const loadedData = useLoaderData();
  const [isLoading, setIsloading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  if (!checkCookieExists("api_token")) {
    navigate("/404", { replace: true });
  }

  useEffect(() => {
    setIsloading(true);
    loadedData.Manuals.then((res) => {
      if (res.status === 401) {
        setIsloading(false);
        setMessage(res.message);
      }
      if (res.status === 200) {
        setIsloading(false);
        setIsAuth(true);
      }
    });
  }, [loadedData.Manuals]);

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
      <p className="text-white text-center text-xl sm:text-2xl">{message}</p>
      {isLoading && (
        <img className="w-24 mx-auto" src={loading} alt="loading..." />
      )}
      {isAuth && (
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
              <PendingManual
                manuals={loadedData.pending_manuals}
                isPending={true}
              />
            )}
          </Await>
        </Suspense>
      )}
    </>
  );
};

export default PendingManuals;

export const loader = async () => {
  return defer({
    Manuals: getPendingManuals(),
  });
};
