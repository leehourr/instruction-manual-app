import React from "react";
import {
  useActionData,
  Navigate,
  redirect,
  defer,
  useLoaderData,
} from "react-router-dom";
import Signup from "../components/Auth/Signup";
import { signUp } from "../utils/api";

const AuthSignup = () => {
  const result = useActionData();
  console.log("result in action");
  console.log(result);
  return <Signup />;
};

export default AuthSignup;

export const action = async ({ request }) => {
  const data = await request.formData();
  // console.log(data);
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const credential = { name, email, password };
  // console.log("login");
  const isSignedUp = await signUp(credential);
  if (isSignedUp) {
    sessionStorage.setItem("signUp", `${isSignedUp.message}`);
  }

  return redirect("/");
  // console.log("in action");
  // console.log(credential);
};
