import React, { useState } from "react";
import Info from "./Info";
import ChatBox from "./ChatBox";

const Conversation = () => {
  const [showInfo, setShowInfo] = useState<boolean>(true);

  return (
    <div
      className={`w-full h-full rounded-lg shadow-lg ${
        showInfo ? " grid grid-cols-chat" : ""
      }`}
    >
      <ChatBox showInfo={showInfo} setShowInfo={setShowInfo} />
      {showInfo && <Info />}
    </div>
  );
};

export default Conversation;
