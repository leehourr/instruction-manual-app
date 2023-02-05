import React, { Suspense, useEffect, useState } from "react";
import {
  Await,
  defer,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
import Logout from "../components/Auth/Logout";
import { getUser } from "../utils/api";

const Profile = () => {
  const navigate = useNavigate();
  const [isNameMatch, setIsNameMatch] = useState(false);
  const param = useParams();
  const name = param.name;
  const uData = useLoaderData();

  useEffect(() => {
    uData.userData.then((res) => {
      if (res.name !== name) {
        navigate("/404", { replace: true });
      }
      setIsNameMatch(true);
    });
  }, [name, uData.userData, navigate]);

  return (
    <>
      {!isNameMatch && (
        <p className="text-white font-bold text-s sm:text-lg text-center ">
          Loading...
        </p>
      )}
      {isNameMatch && (
        <div className="text-white text-center  w-[80%] sm:w-[70%]  mx-auto">
          <h1 className="mb-2 font-mono text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
            {name}
          </h1>
          <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>

          <div className="text-left w-[80%] sm:w-[30%] mx-auto">
            <Suspense
              fallback={
                <p className="text-white font-bold text-s sm:text-lg text-center ">
                  Loading...
                </p>
              }
            >
              <Await
                resolve={uData.userData}
                errorElement={
                  <p className="text-white font-bold text-s sm:text-lg text-center ">
                    Some error occured!
                  </p>
                }
              >
                {(uData) => (
                  <>
                    <p className="text-s sm:text-xl font-semibold">
                      Account Email:
                      <span className="font-bold ml-2 text-cyan-300">
                        {uData.email}
                      </span>
                    </p>
                    <p className="mt-2 text-s sm:text-xl font-semibold">
                      Role:
                      <span className="font-bold ml-2 uppercase text-cyan-300">
                        {uData.role}
                      </span>
                    </p>
                  </>
                )}
              </Await>
            </Suspense>

            <div className="text-right mt-16">
              <Logout />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

export const loader = async () => {
  return defer({
    userData: getUser(),
  });
};
