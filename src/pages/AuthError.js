import { useEffect } from "react";
// import Login from "../components/Auth/Login";
import { useRouteError, useNavigate } from "react-router-dom";
// import { signIn } from "../utils/api";
// import AuthLogin from "./AuthLogin";

const AuthError = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const errMessage = error.data.message;
  // console.log(error.data.message);
  // console.log(error.status);
  try {
    if (errMessage !== undefined) {
      sessionStorage.removeItem("errorMessage");
      sessionStorage.setItem("errorMessage", `${error.data.message}`);
    }

    if (errMessage === "login error" || errMessage === "signup error") {
      sessionStorage.removeItem("errorMessage");
      // console.log(error.data.errors.email[0]);
      sessionStorage.setItem("errorMessage", `${error.data.errors.email[0]}`);
    }
  } catch (e) {
    console.log(e);
  }

  // console.log("error");

  useEffect(() => {
    if (
      (error.status === 401 && errMessage === "login error") ||
      (error.status === 401 && errMessage === "Incorrect credentials.")
    ) {
      navigate("/Login/attemp", { replace: true });
    }

    if (error.status === 401 && errMessage === "signup error") {
      navigate("/signup", { replace: true });
    }
  }, [error.status, errMessage, navigate]);
};

export default AuthError;
