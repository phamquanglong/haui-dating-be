import React from "react";
import { Avatar, Tooltip } from "antd";

const Message = ({ isMyMessage = false }: { isMyMessage?: boolean }) => {
  return (
    <div
      className={`flex relative w-full my-[24px] ${
        isMyMessage ? "justify-end" : "justify-start"
      }`}
    >
      {!isMyMessage && (
        <Avatar
          size={48}
          src="https://picsum.photos/600/600"
          className="-mt-5 -ml-2 mr-2"
        />
      )}
      <Tooltip title="11:56" placement={`${isMyMessage ? "left" : "right"}`}>
        <div
          className={`relative right-0 max-w-[65%] p-3 ${
            isMyMessage
              ? "bg-primaryColor text-red-50 before:bfMyMess"
              : "bg-[#ddd] before:bfOtherMess ml-2 text-gray-600"
          }  rounded-[10px]`}
        >
          <p className="text-sm md:text-base text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam
          </p>
        </div>
      </Tooltip>
    </div>
  );
};

export default Message;
