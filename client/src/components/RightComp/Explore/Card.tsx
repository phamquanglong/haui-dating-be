import React, { useState, KeyboardEvent } from "react";
import { IUser } from "../../../interface/User";
import Info from "./Info";
// import { CloseOutlined, HeartFilled } from "@ant-design/icons";
import MoreInfo from "./MoreInfo";
import { KEY_CODE } from "../../../config/constant";
import CircleButton from "../../Button/CircleButton";
// import { useAppDispatch } from "../../../hook/useAppDispatch";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

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
      <Info
        userData={userData}
        className={isShowMore === KEY_CODE?.ARROW_DOWN ? "" : "hidden"}
      />
      <MoreInfo
        userData={userData}
        className={isShowMore === KEY_CODE?.ARROW_UP ? "" : "hidden"}
      />
      <CircleButton
        className="absolute top-2 right-2 z-[10]"
        onClick={() => {
          console.log("test");
          setShowMore(
            isShowMore === KEY_CODE.ARROW_DOWN
              ? KEY_CODE.ARROW_UP
              : KEY_CODE.ARROW_DOWN
          );
        }}
      >
        {isShowMore === KEY_CODE.ARROW_DOWN ? (
          <BsArrowDown className="text-white font-black text-xl" />
        ) : (
          <BsArrowUp className="text-white font-black text-xl" />
        )}
      </CircleButton>
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
