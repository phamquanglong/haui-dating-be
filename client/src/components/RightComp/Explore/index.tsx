import React from "react";
import TinderCard from "react-tinder-card";
import Card from "./Card";

const Explore = () => {
  const a = [1, 2, 3, 4, 5, 6];

  return (
    <div className="w-full h-full  flex flex-col justify-start items-center overflow-x-hidden bg-zinc-600">
      <div className=" bg-[url('https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-cong-nghiep-ha-noi-inkythuatso-01-21-15-51-20.jpg')] w-[64px] h-[64px] bg-cover"></div>
      <div className="h-[75%] mt-6 flex justify-center items-center">
        {a.map((el) => (
          <TinderCard
            className="absolute"
            key={el}
            preventSwipe={["up", "down"]}
          >
            <Card width="w-[400px]" height="h-[600px]" />
          </TinderCard>
        ))}
      </div>
      <div className="w-full h-[10%] bg-slate-200"></div>
    </div>
  );
};

export default Explore;
