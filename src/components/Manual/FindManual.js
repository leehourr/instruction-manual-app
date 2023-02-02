import React from "react";
import Card from "../ui/Card";

const FindManual = ({ manual }) => {
  console.log(manual);
  const res = manual.manual;
  //   console.log("in searched card");
  //   console.log(res);
  return (
    <div className="w-[80%] flex gap-x-4 flex-wrap  text-white mx-auto">
      {res.length === 0 ? (
        <p className="text-xl sm:text-2xl mx-auto">
          No result found with for
          <span className="text-cyan-300 ml-2">{manual.title}</span>
        </p>
      ) : (
        res.map((i) => (
          <Card
            key={i.id}
            id={i.id}
            img={i.img_path}
            name={i.title}
            created_at={i.created_at}
            desc={i.description}
          />
        ))
      )}
    </div>
  );
};

export default FindManual;
