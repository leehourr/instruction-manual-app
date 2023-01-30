import React, { Suspense } from "react";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";
import MainNav from "../components/Layout/MainNav";
import { getUser } from "../utils/api";

const Layout = () => {
  const loadedData = useLoaderData();
  return (
    <div className="w-full h-screen ">
      <Suspense
        fallback={
          <div className="h-screen text-white flex flex-col items-center justify-between overflow-hidden">
            <div className="w-full"></div>
            <h1 className=" font-mono text-2xl sm:text-4xl font-bold uppercase">
              Instruction Manuals
            </h1>
            <footer className="text-[0.9rem] mb-4 text-gray-400 sm:text-[1rem]">
              © 2023 Leang Lyhour
            </footer>
          </div>
        }
      >
        <Await
          resolve={loadedData.userData}
          errorElement={
            <p className="text-white font-bold text-s sm:text-lg text-center ">
              Some error occured!
            </p>
          }
        >
          {(loadedData) => <MainNav user={loadedData} />}
        </Await>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default Layout;

export const loader = async () => {
  return defer({
    userData: getUser(),
  });
};
