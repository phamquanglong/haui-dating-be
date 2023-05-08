import React from "react";
import { Avatar, Tooltip } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "../../../hook/useAppSelector";
import TypingIndicator from "./TypingIndicator";

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
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );

  const partner =
    selectedConversation?.userOne?.id === currentUser?.id
      ? selectedConversation?.userTwo
      : selectedConversation?.userOne;

  return (
    <div
      className={`flex relative w-full my-[24px] ${
        isMyMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isMyMessage && (
        <Avatar
          className="-mt-6 -ml-2 mr-4 w-14 h-14"
          // src={
          //   message?.sender?.images?.length > 0
          //     ? message?.sender?.images[0]?.imageUrl
          //     : "https://res.cloudinary.com/dorbkvmvo/image/upload/v1659692903/nonavt_uolnwl.jpg"
          // }
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
      ) : (
        <Tooltip
          title={
            message?.createdAt &&
            dayjs(message?.createdAt).format("HH:mm A DD-MM-YYYY")
          }
          placement={`${isMyMessage ? "left" : "right"}`}
        >
          <div
            className={`relative right-0 max-w-[65%] p-2 ${
              isMyMessage
                ? "bg-primaryColor text-red-50 before:bfMyMess"
                : "bg-[#ddd] before:bfOtherMess ml-2 text-gray-600"
            }  rounded-[10px]`}
          >
            <p className="text-sm md:text-base text-left">{message?.message}</p>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Message;
