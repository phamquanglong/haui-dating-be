import React from "react";
import { IUser } from "../../../interface/User";
import DetailPartner from "./DetailPartner";

const MoreInfo = ({
  userData,
  className,
}: {
  userData?: IUser;
  className: string;
}) => {
  return (
    <div className={`w-full h-full overflow-y-scroll ${className}`}>
      <div className="flex flex-col bg-white border-[1px] rounded-xl pb-4">
        <DetailPartner userData={userData} />
      </div>
    </div>
  );
};

export default MoreInfo;
