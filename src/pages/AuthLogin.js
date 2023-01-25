import React, { useMemo } from "react";
import { Navigate, redirect } from "react-router-dom";
import Login from "../components/Auth/Login";
import { signIn, checkCookieExists } from "../utils/api";

const AuthLogin = () => {
  // const [credential, setCredential] = useState();
  // const navigate = useNavigate();

  const hasToken = useMemo(() => checkCookieExists("token"), []);
  // console.log("check cookie in login");

  // useEffect(() => {
  //   return sessionStorage.removeItem("errorMessage");
  // }, []);
  // console.log(hasToken);

  //
  // if (checkCookie) {
  //
  // }

  return <div>{hasToken ? <Navigate replace to="/" /> : <Login />}</div>;
};

export default AuthLogin;

export const action = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  const credential = { email: email, password: password };
  // console.log("login");
  const user_data = await signIn(credential);
  // console.log("login");
  // console.log(user_data);
  // console.log(user_data.token);

  if (user_data) {
    document.cookie = `token=${user_data.token}; SameSite=Lax; Secure`;
    // console.log("get cookie" + document.cookie.split("=")[1]);
    document.cookie = `uid=${user_data.id}; SameSite=Lax; Secure`;
    document.cookie = `name=${user_data.name}; SameSite=Lax; Secure`;
    document.cookie = `email=${user_data.email}; SameSite=Lax; Secure`;
    document.cookie = `role=${user_data.role}; SameSite=Lax; Secure`;

    // console.log(
    //   "get uid " +
    //     document.cookie
    //       .split("; ")
    //       .find((row) => row.startsWith("name"))
    //       .split("=")[1]
    // );
  }

  //   // console.log(error);
  //
  // }

  // if (login.status === false) {
  //   console.log(" supp");
  //   throw new Response(login.message);
  // }
  return redirect("/");
};
