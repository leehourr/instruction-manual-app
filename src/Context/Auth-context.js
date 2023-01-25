import React from "react";

const AuthContext = React.createContext({
  message: "",
  token: null,
  csrf_token: null,
  setNotification: () => {},
});

export default AuthContext;
