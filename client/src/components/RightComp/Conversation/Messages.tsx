import { find, isEmpty } from "lodash";
import React, { useEffect, useMemo, useState } from "react";
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
  const [isTyping, setTypingStatus] = useState<boolean>(false);
  const displayListMessage = useMemo(() => listMessages, [listMessages]);

  useEffect(() => {
    if (selectedConversation) {
      dispatch(callApiGetAllMessagesOfConversation(selectedConversation?.id));
      setTypingStatus(false);
    }
  }, [dispatch, selectedConversation]);

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveMessage((data: any) => {
        console.log('data',data)
        if (data) {
          dispatch(pushNewMessageAction(data));
        }
      });
      socket.receiveTypingStatus((data: any) => {
        if (selectedConversation?.id === data?.conversationId)
          setTypingStatus(data.isTyping);
      });
    }
  }, [socket, dispatch, selectedConversation?.id]);

  useEffect(() => {
    if (isTyping)
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [isTyping, lastMessageRef]);

  return (
    <div className={"p-4 overflow-y-scroll " + className}>
      {displayListMessage.map((mess: any) => (
        <Message
          key={mess?.id}
          message={mess}
          isMyMessage={currentUser?.id === mess?.sender?.id}
        />
      ))}
      {isTyping && <Message isTyping={true} />}
      <div ref={lastMessageRef} />
    </div>
  );
};

export default Messages;
