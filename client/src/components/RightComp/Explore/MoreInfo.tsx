import React from "react";
import { IUser } from "../../../interface/User";
import DetailPartner from "./DetailPartner";

const MoreInfo = ({
  userData,
  className,
  width,
  height,
}: {
  userData?: IUser;
  className: string;
  width: string;
  height: string;
}) => {
  return (
    <div
      className={`${width} ${height} overflow-y-scroll border-[1px] rounded-xl ${className}`}
    >
      <div className="flex flex-col bg-white pb-4">
        <DetailPartner userData={userData} />
      </div>
    </div>
  );
};

export default MoreInfo;
