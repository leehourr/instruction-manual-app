import React, { useId } from "react";
import AddManual from "../components/Manual/AddManual";
import { redirect, useNavigate } from "react-router-dom";
import { uploadManual } from "../utils/api";

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
  const imgPath = data.get("imgUrl");
  const user_id = document.cookie
    .split("; ")
    ?.find((row) => row.startsWith("uid"))
    .split("=")[1];

  // console.log("in action");
  // console.log(title, desc, imgPath);
  const uploadedManual = await uploadManual({
    user_id,
    title: title,
    description: desc,
    img_path: imgPath,
  });
  // console.log(uploadedManual);
  return redirect("/your-manuals");
};
