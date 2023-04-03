import { CloseOutlined, FlagOutlined } from "@ant-design/icons";
import { Avatar, Button, Tooltip } from "antd";
import React from "react";
import CircleButton from "../../Button/CircleButton";
import Messages from "./Messages";

const ChatBox = () => {
  return (
    <div className="w-full h-[calc(100vh_-_4rem)] rounded-l-lg border-[0.125px] border-r-0">
      <div className="h-[12%] w-full border-b-[0.25px] px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Avatar
            shape="circle"
            size={64}
            src="https://picsum.photos/600/600"
          />
          <h3 className="text-2xl ml-4 font-medium">abc</h3>
        </div>
        <div className="flex justify-center items-center">
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
      <Messages className="h-[78%] w-full border-b-[0.25px]" />
      <div className="h-[10%] w-full flex justify-between items-center px-8">
        <input
          className="placeholder:text-slate-400 text-lg block w-[90%] outline-none"
          type="text"
          placeholder="Type a message"
        />
        <Button type="primary" shape="round" danger size="large">
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatBox;
