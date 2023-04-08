import React from "react";

const Card = ({ width, height }: { width: string; height: string }) => {
  return (
    <div
      className={`${width} ${height} bg-gray-400 rounded-xl relative border-[1px] hover:cursor-grabbing`}
    ></div>
  );
};

export default Card;
