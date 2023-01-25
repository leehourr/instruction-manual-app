import React from "react";
import { useNavigate } from "react-router-dom";
// import ReactDOM from "react-dom";
import { signOut, clearAllCookies } from "../../utils/api";

const Logout = () => {
  const nav = useNavigate();
  const logout = async () => {
    const res = await signOut();
    console.log("logout");
    if (res.status === true) {
      clearAllCookies();
      nav("/", { replace: true });
    }
    console.log(res);
  };

  return (
    <button
      onClick={logout}
      className="uppercase transition-all duration-100 rounded-lg font-bold tracking-wide px-4 shadow-lg hover:shadow-cyan-300 active:shadow-cyan-300 hover:bg-cyan-300   hover:text-zinc-900 hover:scale-125 active:scale-150 hover:border-cyan-300 text-cyan-300 border-2 p-2 border-cyan-300"
    >
      Log out
    </button>
  );
};

export default Logout;
