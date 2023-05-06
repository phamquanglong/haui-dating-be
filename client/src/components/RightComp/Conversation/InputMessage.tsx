import { Button } from "antd";
import React, { KeyboardEvent, useState } from "react";
import { KEY_CODE } from "../../../config/constant";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import { callApiPostMessage } from "../../../reducer/messages.reducer";

const InputMessage = () => {
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const [input, setInput] = useState<string>("");

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (input.trim() !== "") {
      // dispatch(
      //   callApiPostMessage({
      //     conversationId: selectedConversation?.id,
      //     message: input,
      //   })
      // ).then((result: any) => {
      //   if (result?.payload?.status === 201) {
      //     setInput("");
      //   }
      // });
      socket.sendMessage(input, selectedConversation?.id);
      setInput("");
    }
  };

  const handleEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KEY_CODE.ENTER) {
      handleSendMessage(e);
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
