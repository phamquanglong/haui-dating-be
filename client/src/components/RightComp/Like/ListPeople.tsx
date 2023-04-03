import React from "react";
import Card from "../Explore/Card";

const ListPeople = () => {
  const a = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-[100%] h-[740px] grid grid-cols-4 gap-4">
      {a.map((el) => (
        <Card width="w-[100%]" height="h-[100%]" />
      ))}
    </div>
  );
};

export default ListPeople;
