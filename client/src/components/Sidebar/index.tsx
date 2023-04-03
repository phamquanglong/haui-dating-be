import React from "react";
import Conversations from "./Conversations";
import Explore from "./Explore";
import Header from "./Header";

const Sidebar = () => {
  return (
    <div className="h-screen w-full grid grid-rows-sidebar border-r-[1px] border-stone-300">
      <Header />
      <Explore />
      <Conversations />
    </div>
  );
};

export default Sidebar;
