import React from "react";
import AddManual from "../components/Manual/AddManual";

import { redirect, useNavigate } from "react-router-dom";

const UploadManuals = () => {
  const navigate = useNavigate();
  const navBack = () => {
    navigate("/your-manuals");
  };
  return <AddManual navBack={navBack} />;
};

export default UploadManuals;

export const action = async ({ request }) => {
  const data = await request.formData();
  const title = data.get("title");
  const desc = data.get("desc");
  console.log(title, desc);
  return redirect("/your-manuals");
};
