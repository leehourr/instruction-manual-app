import React, { Suspense } from "react";
import { defer, Await, useLoaderData } from "react-router-dom";
import Manual from "../components/Manual/Manual";
import { searchAllManual } from "../utils/api";
import loading from "../assets/loading.gif";

const EachManual = () => {
  const data = useLoaderData();

  return (
    <Suspense
      fallback={<img className="w-24 mx-auto" src={loading} alt="loading..." />}
    >
      <Await
        resolve={data.manual}
        errorElement={
          <p className="text-white font-bold text-s sm:text-lg text-center ">
            Error loading manual.
          </p>
        }
      >
        {(data) => (
          <Manual
            name={data.manual[0].title}
            img={data.manual[0].img_path}
            desc={data.manual[0].description}
          />
        )}
      </Await>
    </Suspense>
  );
};

export default EachManual;

export const loader = async ({ params }) => {
  const manual = params.manualName;
  return defer({ manual: searchAllManual(`${manual}`) });
};
