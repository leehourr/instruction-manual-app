import { useEffect } from "react";
import { useNavigate, useRouteError } from "react-router-dom";

const Unauthzeried = () => {
  const err = useRouteError();
  console.log("ERR ");
  console.log(err);
  const nav = useNavigate();

  useEffect(() => {
    if (err.status === 401) {
      nav("/Login", "/");
    }
  }, [err.status, nav]);
};

export default Unauthzeried;
