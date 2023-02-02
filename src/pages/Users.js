import React, { Suspense, useState, useEffect } from "react";
import { defer, useLoaderData, Await, useNavigate } from "react-router-dom";
import UserLists from "../components/Users/UserLists";
import { checkCookieExists, getUserList } from "../utils/api";
import loading from "../assets/loading.gif";

const Users = () => {
  const [isLoading, setIsloading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [message, setMessage] = useState("");
  const data = useLoaderData();
  const navigate = useNavigate();
  if (!checkCookieExists("api_token")) {
    navigate("/404", { replace: true });
  }

  useEffect(() => {
    setIsloading(true);
    data.userList.then((res) => {
      if (res.status === 401) {
        setIsloading(false);
        setMessage(res.message);
      }
      if (res.status === 200) {
        setIsloading(false);
        setIsAuth(true);
      }
    });
  }, []);

  return (
    <div className="text-white text-center relative  w-[80%] sm:w-[70%]  mx-auto">
      <h1 className="mb-2 font-mono  text-2xl sm:text-4xl font-bold uppercase">
        User Lists
      </h1>
      <p className="text-s sm:text-xl text-zinc-300  ">
        List of all currently active and banned users.
      </p>
      <div className="mx-auto w-24 h-1 my-6 sm:my-10 bg-zinc-300 rounded-full"></div>
      <p className="text-white text-center text-xl sm:text-2xl">{message}</p>
      {isLoading && (
        <img className="w-24 mx-auto" src={loading} alt="loading..." />
      )}
      {isAuth && (
        <Suspense
          fallback={
            <h1 className="mt-24 font-mono text-center text-cyan-300 text-2xl sm:text-4xl font-bold uppercase">
              Loading...
            </h1>
          }
        >
          <Await
            resolve={data.userList}
            errorElement={() => {
              <p className="text-white font-bold text-s sm:text-lg text-center ">
                Error loading users.
              </p>;
            }}
          >
            {(loadedData) =>
              loadedData.users.map((i) => (
                <UserLists
                  key={i.id}
                  id={i.id}
                  email={i.email}
                  name={i.name}
                  status={i.status}
                />
              ))
            }
          </Await>
        </Suspense>
      )}
    </div>
  );
};

export default Users;

export const loader = async () => {
  return defer({
    userList: getUserList(),
  });
};
