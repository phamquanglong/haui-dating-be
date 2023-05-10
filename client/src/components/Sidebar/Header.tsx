import {
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Avatar, Menu, message, Popover } from "antd";
import React from "react";
import { EXPLORE, LIKE, SETTING } from "../../config/constant";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import { actionLogout } from "../../reducer/auth.reducer";
import { actionResetConversation } from "../../reducer/conversations.reducer";
import { actionSetComponent } from "../../reducer/layout.reducer";
import { actionResetMessage } from "../../reducer/messages.reducer";
import { actionResetSocket } from "../../reducer/socket.reducer";
import CircleButton from "../Button/CircleButton";
import { BiDotsHorizontalRounded } from "react-icons/bi";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const socket = useAppSelector((state) => state.socketReducer.socket);

  const handleLogout = () => {
    dispatch(actionLogout());
    dispatch(actionResetConversation());
    dispatch(actionResetMessage());
    dispatch(actionResetSocket());
    dispatch(actionSetComponent(EXPLORE));
    socket.disconnect();
    message.success("Logout successfully.", 2);
  };

  const handleSetting = () => {
    dispatch(actionSetComponent(SETTING));
  };
  const handleLike = () => {
    dispatch(actionSetComponent(LIKE));
  };

  const renderDropDownOptions = () => {
    return (
      <Menu
        items={[
          {
            label: "History",
            key: "1",
            icon: <HeartOutlined className="text-red-50" />,
            onClick: () => handleLike(),
          },
          {
            label: "Settings",
            key: "2",
            icon: <SettingOutlined className="text-red-50" />,
            onClick: () => handleSetting(),
          },
          {
            label: "Logout",
            key: "3",
            icon: <LogoutOutlined className="text-red-50" />,
            onClick: () => handleLogout(),
          },
        ]}
      />
    );
  };

  return (
    <div className="h-full w-full bg-gradient-to-r to-primaryColor from-red-400 px-2 lg:px-6 md:py-1 lg:py-0 flex justify-between items-center ">
      <div className="flex items-center">
        <Avatar
          shape="circle"
          src={
            user?.profile !== null && !loading && user?.images?.length > 0
              ? user?.images[0]?.imageUrl
              : "https://res.cloudinary.com/dorbkvmvo/image/upload/v1659692903/nonavt_uolnwl.jpg"
          }
          className="border-[1.5px] border-white md:w-12 md:h-12 lg:w-16 lg:h-16 shrink-0"
        />
        <h3 className="md:text-base lg:text-xl ml-2 text-red-50">
          {user?.profile?.fullName || "Welcome to HaUI Dating"}
        </h3>
      </div>

      {/* <div className=" md:hidden lg:flex">
        <Tooltip title="See who like you">
          <CircleButton className="mr-2" onClick={handleLike}>
            <HeartOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
        <Tooltip title="Setting">
          <CircleButton className="mr-2" onClick={handleSetting}>
            <SettingOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
        <Tooltip title="Logout">
          <CircleButton onClick={handleLogout}>
            <LogoutOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
      </div> */}

      <Popover content={renderDropDownOptions} trigger="click">
        <CircleButton className="border-[1px] bg-red-400">
          <BiDotsHorizontalRounded className="text-red-100 text-3xl" />
        </CircleButton>
      </Popover>
    </div>
  );
};

export default Header;
