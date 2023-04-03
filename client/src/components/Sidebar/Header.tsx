import {
  HeartOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Tooltip } from "antd";
import React from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { useAppSelector } from "../../hook/useAppSelector";
import { logoutAction } from "../../reducer/auth.reducer";
import CircleButton from "../Button/CircleButton";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authReducer.user);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <div className="h-full w-full bg-gradient-to-r from-primaryColor to-rose-600 px-6 flex justify-between items-center">
      <div className="flex items-center">
        <Avatar shape="circle" size={48} icon={<UserOutlined />} />
        <h3 className="text-xl ml-2 text-red-50">
          {user?.userName || "danglong"}
        </h3>
      </div>
      <div className="flex">
        <Tooltip title="See who like you">
          <CircleButton className="mr-2">
            <HeartOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
        <Tooltip title="Setting">
          <CircleButton className="mr-2">
            <SettingOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
        <Tooltip title="Logout">
          <CircleButton onClick={handleLogout}>
            <LogoutOutlined className="text-red-50" />
          </CircleButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
