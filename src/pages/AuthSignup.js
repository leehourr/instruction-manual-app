import React from "react";
import Signup from "../components/Auth/Signup";
import { signUp } from "../utils/api";

const AuthSignup = () => {
  return <Signup />;
};

export default AuthSignup;

export const action = async ({ request }) => {
  const data = await request.formData();
  console.log(data);
  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
  const credential = { name, email, password };
  // console.log("login");
  const user_data = await signUp(credential);
  
  // console.log("in action");
  // console.log(credential);
};
