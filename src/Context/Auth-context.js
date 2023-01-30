import React from "react";

const AuthContext = React.createContext({
  // message: "",
  onGetUser: () => {},
  onSignUp: (credential) => {},
  onLogin: (credential) => {},
  onLogout: () => {},
});

export default AuthContext;
