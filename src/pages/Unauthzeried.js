import React, { useEffect } from "react";
import { redirect, useNavigate, useRouteError } from "react-router-dom";

export const Unauthzeried = () => {
  const err = useRouteError();
  // console.log("ERR ");
  // console.log(err);
  const nav = useNavigate();

  useEffect(() => {
    if (err.status === 401) {
      nav("/Login", "/");
    }
  }, []);
};
