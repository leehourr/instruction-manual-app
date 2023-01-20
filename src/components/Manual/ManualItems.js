import React, { useState } from "react";
import Card from "../ui/Card";
// import Manual from "./Manual";

const ManualItems = ({ manuals }) => {
  return (
    <>
      <div className="w-[80%] flex gap-x-4 flex-wrap  text-white mx-auto">
        {manuals.map((i) => (
          <Card
            key={i.id}
            img={i.img_path}
            name={i.title}
            uploaded_by={i.uploaded_by}
            created_at={i.created_at}
            // desc={i.description}
          />
        ))}
      </div>
    </>
  );
};

export default ManualItems;
