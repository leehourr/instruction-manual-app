import { useReducer } from "react";

import AuthContext from "./Auth-context";

const defaultAuth = {
  message: "",
  name: "",
  email: "",
  role: "",
  user_uploads: [],
  token: null,
  csrf_token: null,
};

const AuthProvider = (props) => {
  return (
    <AuthContext.Provider value={defaultAuth}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
