import React, { Fragment, useState, useRef } from "react";
import { Link, useFetcher } from "react-router-dom";
// import { Link } from "react-router-dom";
import reading from "../../assets/reading.gif";
import ReactDOM from "react-dom";

const Login = () => {
  const inputEmail = useRef();
  const inputPassword = useRef();
  const fetcher = useFetcher();
  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvlaidPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    setInvalidEmail("");
    setInvlaidPassword("");

    validateInput(email, password);
    fetcher.submit({ email, password }, { method: "post", action: "/login" });
  };

  const validateInput = (email, password) => {
    if (!email.includes("@") && !email.includes(".")) {
      setInvalidEmail("Invalid email format");
    }
    if (password.length < 6) {
      setInvlaidPassword("Password must be 6 characters long");
    }
    return;
  };

  return (
    <div className=" w-full h-screen text-white flex flex-col items-center justify-center">
      <img
        className="w-60 h-60 sm:w-72 sm:h-72 rounded-[100%]"
        src={reading}
        alt="reading"
      />
      <h1 className="uppercase my-4 font-bold text-2xl sm:text-3xl">
        Instruction manuals
      </h1>
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
            className="w-full block bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-pink-600 border-b-4 border-b-transparent focus:border-b-pink-600"
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
            className=" w-full bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-pink-600  border-b-4 border-b-transparent focus:border-b-pink-600"
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
          Login
        </button>
        <p>
          Don't have an account ?
          <Link to="/Signup" className="text-pink-400 ml-1 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
