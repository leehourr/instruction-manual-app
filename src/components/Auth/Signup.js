import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/Auth-context";
import ReactDOM from "react-dom";
import reading from "../../assets/reading.gif";
import { Backdrop } from "../ui/Backdrop";

import congrat from "../../assets/congrat.gif";

const Signup = () => {
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputName = useRef();
  const inputPassword = useRef();
  const inputConfirmPass = useRef();
  const authCtx = useContext(AuthContext);
  const [errMessage, setErrMessage] = useState("");
  const [isAccCreated, setIsAccCreated] = useState(false);

  const [invalidEmail, setInvalidEmail] = useState("");
  const [invalidPassword, setInvalidPassword] = useState("");
  const [unmatchedPass, setUnmatchedPass] = useState("");

  const signUpHandler = async (e) => {
    e.preventDefault();
    const name = inputName.current.value;
    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const confirmPass = inputConfirmPass.current.value;
    let res;

    setInvalidEmail("");
    setInvalidPassword("");
    setUnmatchedPass("");
    setErrMessage("");

    const isValid = validateInput(
      email,
      password.trim().replaceAll(" ", ""),
      confirmPass
    );
    if (isValid) {
      const credential = { name, email, password };
      res = await authCtx.onSignUp(credential);
      // fetcher.submit(credential, { method: "post", action: "/Signup" });
    }

    if (res.status === 409) {
      setErrMessage(res.message.email[0]);
    }

    if (res.status === 200) {
      setIsAccCreated(true);
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

  const redirectToHome = () => {
    navigate("/", { replace: true });
  };

  const redirectToLogin = () => {
    navigate("/login", { replace: true });
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
      {errMessage && (
        <p className="bg-red-500 tracking-wide w-[80%] my-4 text-center rounded-sm font-semibold py-1  sm:w-[23rem]">
          {errMessage}
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

      {isAccCreated &&
        ReactDOM.createPortal(
          <Backdrop />,
          document.getElementById("backdrop")
        )}
      {isAccCreated &&
        ReactDOM.createPortal(
          <div className="absolute text-white   w-[80%] sm:w-[27%] h-[67%] flex flex-col justify-between top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  z-50">
            <img
              className="absolute top-0 left-1/2 -translate-x-1/2 w-60 h-60 sm:w-72 sm:h-72 object-cover mx-auto rounded-[100%]"
              src={congrat}
              alt="img"
            />
            <div className="bg-zinc-800 h-[75%] flex flex-col justify-around mt-auto rounded-t-xl">
              <h1 className="text-cyan-300 mt-40  text-lg sm:text-2xl text-center">
                Congrats!
              </h1>
              <h2 className=" text-s sm:text-xl text-center">
                Your account have been create.
              </h2>
              <div className="w-2/5  mb-1 mx-auto">
                <button
                  onClick={redirectToHome}
                  className="uppercase w-full transition-all mb-2 duration-100 rounded-lg font-semibold tracking-wide px-4 shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 hover:bg-cyan-300   hover:text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 text-cyan-300 border-2 p-2 border-cyan-300"
                >
                  Back to homepage
                </button>
                <p onClick={redirectToLogin} className="w-3/4 text-center mx-auto">
                  Or go to
                  <Link className="underline ml-2 text-cyan-300" to="/login">
                    log in
                  </Link>
                  .
                </p>
              </div>
            </div>

            <div className="w-full"></div>
          </div>,
          document.getElementById("overlay")
        )}
    </div>
  );
};

export default Signup;
