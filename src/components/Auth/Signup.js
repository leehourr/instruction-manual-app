import React, { useEffect, useRef, useState } from "react";
import { Link, useFetcher } from "react-router-dom";
// import { Link } from "react-router-dom";
import reading from "../../assets/reading.gif";

const Signup = () => {
  const inputEmail = useRef();
  const inputName = useRef();
  const inputPassword = useRef();
  const inputConfirmPass = useRef();

  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [unmatchedPass, setUnmatchedPass] = useState("");

  const fetcher = useFetcher();

  let error = sessionStorage?.getItem("errorMessage");

  useEffect(() => {
    return sessionStorage.removeItem("errorMessage");
  }, []);
  const signUpHandler = (e) => {
    e.preventDefault();
    const name = inputName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const confirmPass = inputConfirmPass.current.value;
    setInvalidEmail("");
    setInvalidPassword("");
    setUnmatchedPass("");

    const isValid = validateInput(
      email,
      password.trim().replaceAll(" ", ""),
      confirmPass
    );
    if (isValid) {
      const credential = { name, email, password };

      fetcher.submit(credential, { method: "post", action: "/Signup" });
    }
  };

  const validateInput = (email, password, confirm_password) => {
    let isEmailValid = true;
    let isPassValid = true;
    let matchedPass = true;
    // console.log(password);

    if (!email.includes("@") && !email.includes(".")) {
      setInvalidEmail("Invalid email format.");
      isEmailValid = false;
    }

    if (password.length < 6) {
      // console.log("in validation");
      // console.log(password);
      setInvalidPassword("Password must be 6 characters long.");
      isPassValid = false;
    }

    if (password !== confirm_password) {
      // console.log(confirm_password);
      setUnmatchedPass("Passwords do not match.");
      matchedPass = false;
    }

    if (!isEmailValid || !isPassValid || !matchedPass) {
      return false;
    }
    return true;
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
      {error && (
        <p className="bg-red-500 tracking-wide w-[80%] my-4 text-center rounded-sm font-semibold py-1  sm:w-[23rem]">
          {error}
        </p>
      )}
      <form
        onSubmit={signUpHandler}
        className="w-full flex flex-col items-center justify-center"
      >
        <div className={` w-[80%] sm:w-[23rem] mb-4   ${""} `}>
          <input
            ref={inputName}
            className="w-full block bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-cyan-300 border-b-2 border-b-transparent focus:border-b-cyan-300"
            type="text"
            placeholder="Name"
            name="name"
            required
          />
          <span className="text-red-500 font-semibold tracking-wider">
            {""}
          </span>
        </div>

        <div className={` w-[80%] sm:w-[23rem] mb-4   ${""} `}>
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

        <div className={` w-[80%] sm:w-[23rem] mb-4   ${""} `}>
          <input
            className="w-full block bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-cyan-300 border-b-2 border-b-transparent focus:border-b-cyan-300"
            ref={inputPassword}
            type="password"
            placeholder="Password"
            name="password"
            required
          />
          <span className="text-red-500 font-semibold tracking-wider">
            {invalidPassword}
          </span>
        </div>

        <div className={` w-[80%] sm:w-[23rem] mb-4   ${""} `}>
          <input
            className="w-full block bg-zinc-700 h-9 px-2 rounded-lg outline-none caret-cyan-300 border-b-2 border-b-transparent focus:border-b-cyan-300"
            ref={inputConfirmPass}
            type="password"
            placeholder="Confirm password"
            name="confirm_password"
            required
          />
          <span className="text-red-500 font-semibold tracking-wider">
            {unmatchedPass}
          </span>
        </div>

        <button className=" w-[80%] sm:w-[23rem] mb-4 h-9 rounded-lg bg-gradient-to-r  from-indigo-500 via-purple-500 to-pink-500 shadow-lg hover:shadow-pink-500 active:shadow-pink-500  ">
          Sign up
        </button>
        <p>
          Already have an account ?
          <Link to="/Login" className="text-cyan-300 ml-1 font-semibold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
