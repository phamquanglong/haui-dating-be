import React from "react";
import Info from "./Info";
import ChatBox from "./ChatBox";

const Conversation = () => {
  return (
    <div className="w-full h-full rounded-lg grid grid-cols-chat shadow-lg">
      <ChatBox />
      <Info />
    </div>
  );
};

export default Conversation;
