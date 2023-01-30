import AuthContext from "./Auth-context";
import { signUp, signIn, signOut, getUser } from "../utils/api";
// import { useState } from "react";

const AuthProvider = (props) => {
  // const [message, setMessage] = useState("");

  const getUserData = async () => {
    const res = await getUser();
    return res;
  };

  const loginHandler = async (credential) => {
    const res = await signIn(credential);
    const statCode = res.status;
    console.log(res);

    if (statCode === 401 || statCode === 513) {
      // console.log(res.message);
      return res;
    }

    document.cookie = `api_token=${res.token}; SameSite=Lax; Secure`;
    return res;
  };

  const signUpHandler = async (credential) => {
    const res = await signUp(credential);
    console.log("signup in context");
    console.log(res);
    return res;
  };

  const logoutHandler = async () => {
    const res = await signOut();
    console.log(res);
  };

  const value = {
    onGetUser: getUserData,
    onSignUp: signUpHandler,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export default AuthProvider;
