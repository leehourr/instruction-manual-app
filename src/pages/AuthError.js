import React, { useEffect } from "react";
import Login from "../components/Auth/Login";
import { useRouteError, useNavigate } from "react-router-dom";
import { signIn } from "../utils/api";
import AuthLogin from "./AuthLogin";

const AuthError = () => {
  const navigte = useNavigate();
  const error = useRouteError();
  // console.log(error.data.message);
  // console.log(error.status);
  if (error.data.message) {
    sessionStorage.removeItem("errorMessage");
    sessionStorage.setItem("errorMessage", `${error.data.message}`);
  }

  if (error.data.message === "validation error") {
    sessionStorage.removeItem("errorMessage");
    // console.log(error.data.errors.email[0]);
    sessionStorage.setItem("errorMessage", `${error.data.errors.email[0]}`);
  }
  // console.log("error");

  useEffect(() => {
    if (error.status === 401) {
      navigte("/Login/attemp", { replace: true });
    }
  }, []);
};

export default AuthError;
