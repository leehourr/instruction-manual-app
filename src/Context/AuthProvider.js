import AuthContext from "./Auth-context";
import { signIn, signOut } from "../utils/api";
import { useState } from "react";

const AuthProvider = (props) => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  // console.log(name);
  // console.log(email);
  // console.log(message);
  // console.log(role);

  const loginHandler = async (credential) => {
    const res = await signIn(credential);
    const statCode = res.status;
    // console.log(res);

    if (statCode === 513) {
      // console.log(res.errors.email[0]);
      setMessage(res.errors.email[0]);
      return res;
    }
    if (statCode === 401) {
      // console.log(res.message);
      setMessage(res.message);
      return res;
    }
    setName(res.name);
    setEmail(res.email);
    setRole(res.role);
    document.cookie = `api_token=${res.token}; SameSite=Lax; Secure`;
    return res;
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
