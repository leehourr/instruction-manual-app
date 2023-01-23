import React, { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import { signIn } from "../utils/api";

const AuthLogin = () => {
  const [credential, setCredential] = useState();

  return <Login />;
};

export default AuthLogin;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const credential = { email: email, password: password };
  const login = await signIn(credential);
  console.log(login);
};
