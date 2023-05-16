import { Button } from "antd";
import { isEmpty } from "lodash";
import React, { KeyboardEvent, useEffect, useState } from "react";
import { KEY_CODE } from "../../../config/constant";
import { useAppSelector } from "../../../hook/useAppSelector";

const InputMessage = () => {
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!isEmpty(socket)) {
      const handleSetTypingStatus = (i: string) => {
        if (i !== "") {
          socket.setTypingStatus(true, selectedConversation?.id);
        } else {
          socket.setTypingStatus(false, selectedConversation?.id);
        }
      };

      handleSetTypingStatus(input);
    }
  }, [input, socket, selectedConversation?.id]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (input.trim() !== "") {
      if (!isEmpty(socket)) {
        socket.sendMessage(input, selectedConversation?.id);
        setInput("");
      }
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      handleSendMessage(e);
    }
  };

  const handeUpdateIsSeenMessage = () => {
    if (!isEmpty(socket)) {
      socket.seenMessage(selectedConversation?.id);
    }
  };

  return (
    <div className="h-[10%] w-full flex justify-between items-center px-8">
      <input
        className="placeholder:text-slate-400 text-lg block w-[90%] outline-none"
        type="text"
        placeholder="Type a message ..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleEnter}
        onFocus={handeUpdateIsSeenMessage}
      />
      <Button
        type="primary"
        shape="round"
        danger
        size="large"
        onClick={handleSendMessage}
      >
        Send
      </Button>
    </div>
  );
};

export default InputMessage;
