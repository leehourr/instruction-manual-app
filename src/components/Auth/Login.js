import React, { useState, useRef, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auth-context";
// import { Link } from "react-router-dom";
import reading from "../../assets/reading.gif";
import { checkCookieExists } from "../../utils/api";

import loading from "../../assets/loading.gif";
import { LoadingStimulate } from "../../utils/LoadingStimulate";

const Login = () => {
  const AuthCtx = useContext(AuthContext);
  const inputEmail = useRef();
  const inputPassword = useRef();
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsloading(true);
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    setInvalidPassword("");
    setError("");

    let res;
    if (validateInput(email, password)) {
      console.log("context in login");
      await LoadingStimulate(2000);
      // fetcher.submit({ email, password }, { method: "post", action: "/login" });
      res = await AuthCtx.onLogin({ email, password });
    }
    setIsloading(false);
    console.log(res);

    if (res?.status === 200) {
      return navigate("/", { replace: true });
    }

    if (res?.status === 513) {
      inputPassword.current.value = "";
      setError(res.errors.email[0]);
    }
    if (res?.status === 401) {
      inputPassword.current.value = "";
      setError(res.message);
    }
    if (res?.status === 403) {
      inputEmail.current.value = "";
      inputPassword.current.value = "";
      setError(res.message);
    }
  };

  const validateInput = (email, password) => {
    let isEmailValid = true;
    let isPassValid = true;

    if (!email.includes("@") && !email.includes(".")) {
      setInvalidEmail("Invalid email format.");
      isEmailValid = false;
    }

    if (password.length < 6) {
      setInvalidPassword("Password must be 6 characters long.");
      isPassValid = false;
    }

    if (!isEmailValid || !isPassValid) {
      return false;
    }
    return true;
  };

  return (
    <>
      {checkCookieExists("api_token") ? (
        <Navigate to="/" replace />
      ) : (
        <div className=" w-full h-screen text-white flex flex-col items-center justify-center">
          <img
            className="w-60 h-60 sm:w-72 sm:h-72 rounded-[100%]"
            src={reading}
            alt="reading"
          />
          <h1 className="uppercase my-4 font-bold text-2xl  sm:text-3xl">
            Instruction manuals
          </h1>
          {error && (
            <p className="bg-red-500 tracking-wide w-[80%] my-4 text-center rounded-sm font-semibold py-1  sm:w-[23rem]">
              {error}
            </p>
          )}
          <form
            onSubmit={loginHandler}
            className="w-full flex flex-col items-center justify-center"
          >
            <div
              className={` w-[80%] sm:w-[23rem] mb-4   ${
                invalidEmail ? "mb-1" : "mb-4"
              } `}
            >
              <input
                ref={inputEmail}
                className="w-full block bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-cyan-300 border-b-2 border-b-transparent focus:border-b-cyan-300"
                type="text"
                placeholder="Email"
                name="email"
                required
              />
              <span className="text-red-500 font-semibold tracking-wider">
                {invalidEmail}
              </span>
            </div>
            <div
              className={`w-[80%] sm:w-[23rem] mb-4  ${
                invalidPassword ? "mb-1" : "mb-4"
              } `}
            >
              <input
                ref={inputPassword}
                className=" w-full bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-cyan-300  border-b-2 border-b-transparent focus:border-b-cyan-300"
                type="password"
                placeholder="Password"
                name="password"
                required
              />
              <span className="text-red-500 font-semibold tracking-wider">
                {invalidPassword}
              </span>
            </div>
            <button
              type="Submit"
              className="w-[80%] sm:w-[23rem] mb-4 h-9 rounded-lg bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-pink-500 active:shadow-pink-500  "
            >
              {isLoading ? (
                <img className="w-8 mx-auto" src={loading} alt="loading" />
              ) : (
                "Login"
              )}
            </button>
            <p>
              Don't have an account ?
              <Link to="/Signup" className="text-cyan-300 ml-1 font-semibold">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
