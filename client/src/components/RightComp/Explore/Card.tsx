import React from "react";
import { IUser } from "../../../interface/User";
import CircleButton from "../../Button/CircleButton";
import Info from "./Info";
import { CloseOutlined, HeartFilled } from "@ant-design/icons";
import MoreInfo from "./MoreInfo";

const Card = ({
  userData,
  width,
  height,
}: {
  userData?: IUser;
  width: string;
  height: string;
}) => {
  return (
    <div className={`${width} ${height} hover:cursor-pointer relative`}>
      {/* <Info userData={userData} /> */}
      <MoreInfo userData={userData} />
      <div className="w-full h-[20%] absolute bottom-0 flex justify-around items-center px-10">
        <CircleButton className="border-none shadow-2xl bg-primaryColor w-20 h-20 z-[1]">
          <CloseOutlined className="text-white font-black text-3xl" />
        </CircleButton>
        <CircleButton className="border-none shadow-2xl bg-green-500 w-20 h-20 z-[1]">
          <HeartFilled className="text-white font-extrabold text-3xl" />
        </CircleButton>
      </div>
    </div>
  );
};

export default Card;
