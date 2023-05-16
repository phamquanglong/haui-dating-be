import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  Menu,
  message as antdMess,
  Popover,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "../../../hook/useAppSelector";
import TypingIndicator from "./TypingIndicator";
import CircleButton from "../../Button/CircleButton";
import { AiOutlineMore } from "react-icons/ai";
import { isEmpty, max } from "lodash";

const Message = ({
  message,
  isMyMessage,
  isTyping,
}: {
  message?: any;
  isMyMessage?: boolean;
  isTyping?: boolean;
}) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const listMessages = useAppSelector(
    (state) => state.messagesReducer.listMessages
  );
  const [isShowMore, setShowMore] = useState(false);
  const [isSeen, setIsSeen] = useState(false);

  const listIdOfYourMessage = listMessages
    .filter((mess: any) => currentUser?.id === mess?.sender?.id)
    .map((mess: any) => mess?.id);

  const partner =
    selectedConversation?.userOne?.id === currentUser?.id
      ? selectedConversation?.userTwo
      : selectedConversation?.userOne;

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveUpdateIsSeenMessage((data: any) => {
        if (data?.isSeen === true) {
          setIsSeen(true);
        }
      });
    }
  }, [socket]);
  const renderDropDownYourOptions = () => {
    return (
      <Menu
        items={[
          {
            key: "1",
            label: "Recall message",
            onClick: () => {
              if (!isEmpty(socket)) {
                socket.deleteMessage(message?.id, selectedConversation?.id);
              }
            },
          },
          {
            key: "2",
            label: "Copy message",
            onClick: () => {
              navigator.clipboard.writeText(message?.message);
              antdMess.success("Copied to clipboard", 200);
            },
          },
        ]}
      />
    );
  };
  const renderDropDownPartnerOptions = () => {
    return (
      <Menu
        items={[
          {
            key: "2",
            label: "Copy message",
            onClick: () => {
              navigator.clipboard.writeText(message?.message);
              antdMess.success("Copied to clipboard", 200);
            },
          },
        ]}
      />
    );
  };

  return (
    <div
      className={`flex relative w-full my-[23px] ${
        isMyMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isMyMessage && (
        <Avatar
          className="-mt-6 -ml-2 mr-4 w-14 h-14"
          src={
            partner?.profile !== null && partner?.images?.length > 0
              ? partner?.images[0]?.imageUrl
              : "https://res.cloudinary.com/dorbkvmvo/image/upload/v1659692903/nonavt_uolnwl.jpg"
          }
        />
      )}

      {isTyping ? (
        <div
          className={`relative right-0 max-w-[65%] p-2 ${
            isMyMessage
              ? "bg-primaryColor text-red-50 before:bfMyMess"
              : "bg-[#ddd] before:bfOtherMess ml-2 text-gray-600"
          }  rounded-[10px]`}
        >
          <TypingIndicator />
        </div>
      ) : message?.userDelete ? (
        <Divider orientation="center">
          <p className="text-sm text-gray-400 font-light lg:font-normal">
            {message?.userDelete === currentUser?.id
              ? "You recall a message"
              : `${partner?.profile?.fullName} recall a message`}
          </p>
        </Divider>
      ) : (
        <div
          className={`relative right-0 max-w-[65%] break-words p-2 ${
            isMyMessage
              ? "bg-primaryColor text-red-50 before:bfMyMess"
              : "bg-[#ddd] before:bfOtherMess ml-2 text-gray-600"
          }  rounded-[10px]`}
        >
          <Tooltip
            title={
              message?.createdAt &&
              dayjs(message?.createdAt).format("HH:mm A DD-MM-YYYY")
            }
            placement={`${isMyMessage ? "left" : "right"}`}
          >
            <p className="text-sm md:text-base text-left">{message?.message}</p>
          </Tooltip>
          <Popover
            content={
              isMyMessage
                ? renderDropDownYourOptions
                : renderDropDownPartnerOptions
            }
            trigger="click"
            placement={`${isMyMessage ? "left" : "right"}`}
            onOpenChange={() => setShowMore(false)}
          >
            <CircleButton
              className={`${
                isShowMore ? "opacity-100" : "opacity-0"
              } hover:opacity-100 border-[1px] w-8 h-8 bg-white absolute top-1 ${
                isMyMessage ? "-left-10" : "-right-10"
              } `}
              onClick={() => setShowMore((prev) => !prev)}
            >
              <AiOutlineMore className="text-gray-400 text-xl" />
            </CircleButton>
          </Popover>
          {isMyMessage && message?.id === max(listIdOfYourMessage) ? (
            message?.isSeen || isSeen ? (
              <p className="absolute -bottom-4 lg:-bottom-6 right-0 text-xs font-light lg:font-normal text-gray-400">
                Read
              </p>
            ) : (
              <p className="absolute -bottom-4 lg:-bottom-6 right-0 text-xs font-light lg:font-normal text-primaryColor">
                Unread
              </p>
            )
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default Message;
