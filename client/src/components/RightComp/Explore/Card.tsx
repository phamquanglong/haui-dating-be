import React, { useState, KeyboardEvent } from "react";
import { IUser } from "../../../interface/User";
import Info from "./Info";
// import { CloseOutlined, HeartFilled } from "@ant-design/icons";
import MoreInfo from "./MoreInfo";
import { KEY_CODE } from "../../../config/constant";
import CircleButton from "../../Button/CircleButton";
// import { useAppDispatch } from "../../../hook/useAppDispatch";
// import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { Tooltip } from "antd";

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
      className={`${width} ${height} hover:cursor-grab relative bg-white`}
      tabIndex={0}
      onKeyDown={(e) => onKeyDown(e)}
    >
      <Info
        width={width}
        height={height}
        userData={userData}
        className={isShowMore === KEY_CODE?.ARROW_DOWN ? "" : "hidden"}
      />
      <MoreInfo
        width={width}
        height={height}
        userData={userData}
        className={isShowMore === KEY_CODE?.ARROW_UP ? "" : "hidden"}
      />
      <CircleButton
        className="absolute top-2 right-2 z-[10] border-none"
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
          <Tooltip title="More Info">
            <ImArrowDown className="text-white font-black text-2xl animate-arrow-down-fall" />
          </Tooltip>
        ) : (
          <Tooltip title="Less Info">
            <ImArrowUp className="text-white font-black text-xl" />
          </Tooltip>
        )}
      </CircleButton>
    </div>
  );
};

export default Card;
