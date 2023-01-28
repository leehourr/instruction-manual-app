import React from "react";

const AuthContext = React.createContext({
  message: "",
  name: "",
  email: "",
  role: "",
  // csrf_token: null,
  onLogin: (credential) => {},
  onLogout: () => {},
});

export default AuthContext;
