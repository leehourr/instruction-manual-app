import React from "react";
import ManualItems from "./ManualItems";
import Card from "../ui/Card";

const YourManuals = ({ manuals }) => {
  // console.log("in ur manuals compo");
  // console.log(manuals.length);
  return (
    <>
      <div className="w-[80%] flex gap-x-4 flex-wrap  text-white mx-auto">
        {manuals.length > 0 ? (
          manuals.map((i) => (
            <Card
              key={i.id}
              img={i.img_path}
              name={i.title}
              uploaded_by={i.uploaded_by}
              created_at={i.created_at}
              status={i.status}
              // desc={i.description}
            />
          ))
        ) : (
          <p className="mx-auto font-semibold">
            You don't have any manuals. Start upload now.
          </p>
        )}
      </div>
    </>
  );
};

export default YourManuals;
