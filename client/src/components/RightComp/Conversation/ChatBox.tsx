import { CloseOutlined, FlagOutlined, InfoOutlined } from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import { find } from "lodash";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import CircleButton from "../../Button/CircleButton";
import InputMessage from "./InputMessage";
import Messages from "./Messages";

const ChatBox = ({
  showInfo,
  setShowInfo,
}: {
  showInfo: boolean;
  setShowInfo: any;
}) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const listMessages = useAppSelector(
    (state) => state.messagesReducer.listMessages
  );
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  console.log(
    "🚀 ~ file: ChatBox.tsx:24 ~ selectedConversation:",
    selectedConversation
  );
  const listPartnersOnline = useAppSelector(
    (state) => state.partnerReducer.listPartnersOnline
  );
  const lastMessageRef = useRef<any>(null);

  const partner =
    selectedConversation?.userOne?.id === currentUser?.id
      ? selectedConversation?.userTwo
      : selectedConversation?.userOne;

  useEffect(() => {
    lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [listMessages]);

  return (
    <div
      className={`w-[calc(full_-400px)] h-[calc(100vh_-_4rem)] border-[0.125px] border-r-0 ${
        showInfo ? "rounded-l-lg" : "rounded-lg"
      }`}
    >
      <div className="h-[10%] w-full border-b-[0.25px] px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative">
            <Avatar
              className="w-16 h-16"
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
              <span className="bottom-0 right-1 absolute  w-4 h-4 bg-primaryColor border-2 border-white rounded-full"></span>
            )}
            {find(listPartnersOnline, {
              userId: selectedConversation?.userTwo?.id,
            }) && (
              <span className="bottom-0 right-1 absolute  w-4 h-4 bg-primaryColor border-2 border-white rounded-full"></span>
            )}
          </div>
          <h3 className="text-2xl ml-4 font-medium">
            {partner?.profile?.fullName}
          </h3>
        </div>
        <div className="flex justify-center items-center">
          <Tooltip title="Info">
            <CircleButton
              className="mr-2 border-primaryColor border-[2px] w-8 h-8 flex-shrink-0"
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoOutlined className="text-primaryColor font-semibold text-xl" />
            </CircleButton>
          </Tooltip>
          <Tooltip title="Report this user.">
            <CircleButton className="mr-2 border-primaryColor border-[2px] w-8 h-8 flex-shrink-0">
              <FlagOutlined className="text-primaryColor font-semibold text-xl" />
            </CircleButton>
          </Tooltip>
          <Tooltip title="Unmatch">
            <CircleButton className="border-primaryColor border-[2px] w-8 h-8 flex-shrink-0">
              <CloseOutlined className="text-primaryColor font-semibold text-xl" />
            </CircleButton>
          </Tooltip>
        </div>
      </div>
      <Messages
        className="h-[80%] w-full border-b-[0.25px]"
        lastMessageRef={lastMessageRef}
      />
      <InputMessage />
    </div>
  );
};

export default ChatBox;
