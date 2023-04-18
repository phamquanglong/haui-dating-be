import React, { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import { callApiGetAllMessagesOfConversation } from "../../../reducer/messages.reducer";
import Message from "./Message";

const Messages = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const listMessages = useAppSelector(
    (state) => state.messagesReducer.listMessages
  );
  const displayListMessage = useMemo(() => listMessages, [listMessages]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(callApiGetAllMessagesOfConversation(selectedConversation?.id));
    }
  }, [dispatch, selectedConversation]);

  return (
    <div className={"p-4 overflow-y-scroll " + className}>
      {displayListMessage.map((mess: any) => (
        <Message
          key={mess?.id}
          message={mess}
          isMyMessage={currentUser?.id === mess?.sender?.id}
        />
      ))}
    </div>
  );
};

export default Messages;
