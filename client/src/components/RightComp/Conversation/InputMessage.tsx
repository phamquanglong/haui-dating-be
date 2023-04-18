import { Button } from "antd";
import React, { useState } from "react";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import { callApiPostMessage } from "../../../reducer/messages.reducer";

const InputMessage = () => {
  const dispatch = useAppDispatch();
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const [input, setInput] = useState<string>("");

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    if (input.trim() !== "") {
      dispatch(
        callApiPostMessage({
          conversationId: selectedConversation?.id,
          message: input,
        })
      ).then((result: any) => {
        if (result?.payload?.status === 201) {
          setInput("");
        }
      });
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
