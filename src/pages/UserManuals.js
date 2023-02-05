import React, { Suspense, useEffect, useState } from "react";
import YourManuals from "../components/Manual/YourManuals";
import {
  defer,
  useLoaderData,
  Await,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { getYourManuals } from "../utils/api";
import loading from "../assets/loading.gif";

const UserManuals = () => {
  const loadedData = useLoaderData();
  // const err = useRouteError();
  // console.log(loadedData);
  const [hasData, setHasData] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  // const [isAuth, setIsAuth] = useState(false);
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // console.log("isDisabled");
  // console.log(hasDatas);

  useEffect(() => {
    setIsloading(true);
    loadedData.Manuals.then((res) => {
      if (res.status === 403) {
        navigate("/404", "/");
      }
      if (res.status === 200) {
        setIsloading(false);
        // setIsAuth(true);
        setHasData(false);
      }
    });
  }, [loadedData, navigate]);

  const openForm = () => {
    navigate("/your-manuals/upload", "/your-manuals");
  };

  return (
    <>
      <div className="text-white text-center  w-[80%] sm:w-[70%] mx-auto">
        <h1 className="mb-2  font-mono text-2xl sm:text-4xl font-bold uppercase">
          Your manuals
        </h1>
        <button
          disabled={hasData}
          onClick={openForm}
          className={`${
            hasData ? "cursor-not-allowed" : " cursor-pointer"
          } rounded-lg transition-all duration-100 font-bold tracking-wide px-4 shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 hover:bg-cyan-300   hover:text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 text-cyan-300 border-2 p-2 border-cyan-300`}
        >
          Upload manual
        </button>
        <div className="mx-auto w-24 h-1 mt-4 mb-8 sm:mt-6 sm:mb-10 bg-zinc-300 rounded-full"></div>
      </div>
      <Outlet />
      <p className="text-white text-center text-xl sm:text-2xl">{}</p>
      {isLoading && (
        <img className="w-24 mx-auto" src={loading} alt="loading..." />
      )}
      <Suspense
      // fallback={
      //   // <img
      //   //   className="mx-auto w-[70%] sm:w-[20%]"
      //   //   src={cat_what}
      //   //   alt="Loading..."
      //   // />
      //   // <h1 className="mt-24 font-mono text-center text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
      //   //   Loading...
      //   // </h1>
      // }
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
  return defer({
    Manuals: getYourManuals(),
  });
};
