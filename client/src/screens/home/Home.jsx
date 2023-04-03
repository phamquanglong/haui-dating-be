import React from "react";
import RightComp from "../../components/RightComp";
import Sidebar from "../../components/Sidebar";

const Home = () => {
  return (
    <div className="grid grid-cols-home overflow-x-hidden">
      <Sidebar />
      <RightComp />
    </div>
  );
};

export default Home;
