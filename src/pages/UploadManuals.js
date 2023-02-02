import React from "react";
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

  await uploadManual({
    title: title,
    description: desc,
    img_path: imgPath,
  });
  // console.log(uploadedManual);
  return redirect("/your-manuals");
};
