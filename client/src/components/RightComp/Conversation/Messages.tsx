import React, { useEffect, useMemo } from "react";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { useAppSelector } from "../../../hook/useAppSelector";
import {
  callApiGetAllMessagesOfConversation,
  pushNewMessageAction,
} from "../../../reducer/messages.reducer";
import Message from "./Message";

const Messages = ({
  className,
  lastMessageRef,
}: {
  className?: string;
  lastMessageRef: any;
}) => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socketReducer.socket);
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

  useEffect(() => {
    socket.receiveMessage((data: any) => dispatch(pushNewMessageAction(data)));
  }, [socket, dispatch]);

  return (
    <div className={"p-4 overflow-y-scroll " + className}>
      {displayListMessage.map((mess: any) => (
        <Message
          key={mess?.id}
          message={mess}
          isMyMessage={currentUser?.id === mess?.sender?.id}
        />
      ))}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
