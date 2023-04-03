import React from "react";
import Conversation from "./Conversation";
import Explore from "./Explore";
import Like from "./Like";
import Setting from "./Setting";

function RightComp() {
  return (
    <div className="h-screen w-full bg-white p-8">
      {/* <Conversation /> */}
      {/* <Setting /> */}
      {/* <Explore /> */}
      <Like />
    </div>
  );
}

export default RightComp;
