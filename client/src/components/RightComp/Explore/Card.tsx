import React, { useState, KeyboardEvent } from "react";
import { IUser } from "../../../interface/User";
import Info from "./Info";
// import { CloseOutlined, HeartFilled } from "@ant-design/icons";
import MoreInfo from "./MoreInfo";
import { KEY_CODE } from "../../../config/constant";
// import { useAppDispatch } from "../../../hook/useAppDispatch";

const Card = ({
  userData,
  width,
  height,
}: {
  userData: IUser;
  width: string;
  height: string;
}) => {
  // const dispatch = useAppDispatch();
  const [isShowMore, setShowMore] = useState<number>(KEY_CODE.ARROW_DOWN);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KEY_CODE.ARROW_DOWN) setShowMore(KEY_CODE.ARROW_DOWN);
    if (e.keyCode === KEY_CODE.ARROW_UP) setShowMore(KEY_CODE.ARROW_UP);
  };

  return (
    <div
      className={`${width} ${height} hover:cursor-grab relative `}
      tabIndex={0}
      onKeyDown={(e) => onKeyDown(e)}
    >
      {isShowMore === KEY_CODE.ARROW_DOWN ? (
        <Info userData={userData} />
      ) : (
        <MoreInfo userData={userData} />
      )}
      {/* <div className="w-full h-[20%] absolute bottom-0 flex justify-around items-center px-10">
        <CircleButton
          className="border-none shadow-2xl bg-primaryColor w-20 h-20 z-[1]"
          onClick={() => handleCreateAction("left")}
        >
          <CloseOutlined className="text-white font-black text-3xl" />
        </CircleButton>
        <CircleButton
          className="border-none shadow-2xl bg-green-500 w-20 h-20 z-[1]"
          onClick={() => handleCreateAction("right")}
        >
          <HeartFilled className="text-white font-extrabold text-3xl" />
        </CircleButton>
      </div> */}
    </div>
  );
};

export default Card;
