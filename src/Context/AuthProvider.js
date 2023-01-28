import AuthContext from "./Auth-context";
import { signIn, signOut } from "../utils/api";
import { useState } from "react";

const AuthProvider = (props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const loginHandler = async (credential) => {
    console.log("inContext");
    const res = await signIn(credential);
    console.log(res);
  };

  const logoutHandler = async () => {
    const res = await signOut();
    console.log(res);
  };

  const value = {
    message,
    email,
    name,
    role,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
