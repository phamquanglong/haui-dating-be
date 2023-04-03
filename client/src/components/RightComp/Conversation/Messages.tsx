import React from "react";
import Message from "./Message";

const Messages = ({ className }: { className?: string }) => {
  return (
    <div className={"p-4 overflow-y-scroll " + className}>
      <Message isMyMessage />
      <Message />
      <Message isMyMessage />
      <Message />
      <Message isMyMessage />
      <Message isMyMessage />
      <Message />
      <Message isMyMessage />
      <Message isMyMessage />
      <Message />
      <Message isMyMessage />
    </div>
  );
};

export default Messages;
