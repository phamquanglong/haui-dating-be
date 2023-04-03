import { Card } from "antd";
import React from "react";
import Info from "./Info";
import ChatBox from "./ChatBox";

const Conversation = () => {
  return (
    // <Card className="w-full h-full shadow-lg">
    <div className="w-full h-full rounded-lg grid grid-cols-chat shadow-lg">
      <ChatBox />
      <Info />
    </div>
    // </Card>
  );
};

export default Conversation;
