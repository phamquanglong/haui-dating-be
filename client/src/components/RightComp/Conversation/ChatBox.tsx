import { Avatar, Tooltip } from "antd";
import { find, isEmpty } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import InputMessage from "./InputMessage";
import Messages from "./Messages";
import { AiFillInfoCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdFlagCircle } from "react-icons/md";
import {
  deleteMessageAction,
  pushNewMessageAction,
} from "../../../reducer/messages.reducer";
import { useAppDispatch } from "../../../hook/useAppDispatch";

const ChatBox = ({
  showInfo,
  setShowInfo,
}: {
  showInfo: boolean;
  setShowInfo: any;
}) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const dispatch = useAppDispatch();
  const listMessages = useAppSelector(
    (state) => state.messagesReducer.listMessages
  );
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const listPartnersOnline = useAppSelector(
    (state) => state.partnerReducer.listPartnersOnline
  );
  const lastMessageRef = useRef<any>(null);
  const [isActiveConversation, setActiveConversation] = useState<boolean>(
    selectedConversation?.isActive
  );

  const partner =
    selectedConversation?.userOne?.id === currentUser?.id
      ? selectedConversation?.userTwo
      : selectedConversation?.userOne;

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessages]);

  const handleUnmatchPartner = () => {
    socket.unmatch(selectedConversation?.id);
  };

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveUnmatch((data: any) => {
        if (
          data?.conversationId === selectedConversation?.id &&
          data?.isActive === false
        )
          setActiveConversation(false);
      });
    }
  }, [socket, dispatch, selectedConversation?.id]);

  useEffect(() => {
    setActiveConversation(selectedConversation?.isActive);
  }, [selectedConversation?.id]);
  return (
    <div
      className={`h-[calc(100vh_-_4rem)] border-[0.125px]  ${
        showInfo
          ? "rounded-l-lg md:w-1/2 lg:w-2/3 border-r-0"
          : "rounded-lg w-full"
      }`}
    >
      <div className="h-[10%] w-full border-b-[0.25px] px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              className="w-12 h-12 lg:w-14 lg:h-14"
              shape="circle"
              src={
                partner?.profile !== null && partner?.images?.length > 0
                  ? partner?.images[0]?.imageUrl
                  : "https://res.cloudinary.com/dorbkvmvo/image/upload/v1659692903/nonavt_uolnwl.jpg"
              }
            />
            {find(listPartnersOnline, {
              userId: selectedConversation?.userOne?.id,
            }) && (
              <span className="bottom-0 right-1 absolute w-3 h-3 lg:w-4 lg:h-4 bg-primaryColor border-2 border-white rounded-full"></span>
            )}
            {find(listPartnersOnline, {
              userId: selectedConversation?.userTwo?.id,
            }) && (
              <span className="bottom-0 right-1 absolute w-3 h-3 lg:w-4 lg:h-4 bg-primaryColor border-2 border-white rounded-full"></span>
            )}
          </div>
          <h3 className="md:text-xl lg:text-2xl ml-4 font-medium">
            {partner?.profile?.fullName}
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <Tooltip title="Info">
            <div className="p-1 rounded-full hover:bg-gray-100">
              <AiFillInfoCircle
                className="text-primaryColor font-semibold text-3xl"
                onClick={() => setShowInfo(!showInfo)}
              />
            </div>
          </Tooltip>
          <Tooltip title="Report this user.">
            <div className="p-1 rounded-full hover:bg-gray-100">
              <MdFlagCircle className="text-primaryColor font-semibold text-[32px]" />
            </div>
          </Tooltip>
          <Tooltip title="Unmatch">
            <div className="p-1 rounded-full hover:bg-gray-100">
              <AiFillCloseCircle
                className="text-primaryColor font-semibold text-3xl"
                onClick={() => handleUnmatchPartner()}
              />
            </div>
          </Tooltip>
        </div>
      </div>
      <Messages
        className="h-[80%] w-full border-b-[0.25px]"
        lastMessageRef={lastMessageRef}
      />
      {isActiveConversation ? (
        <InputMessage />
      ) : (
        <div className="h-[10%] w-full flex justify-center items-center px-8">
          <p className="text-3xl text-gray-400">
            This conversation has been disabled
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
