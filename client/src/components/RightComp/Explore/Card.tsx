import React from "react";

const Card = ({ width, height }: { width: string; height: string }) => {
  return (
    <div
      className={`${width} ${height} bg-white rounded-xl relative border-[1px]`}
    ></div>
  );
};

export default Card;
