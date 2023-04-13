import React from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import { IUser } from "../../../interface/User";
import DetailPartner from "./DetailPartner";

const MoreInfo = ({ userData }: { userData?: IUser }) => {
  return (
    <div className="w-full h-full overflow-y-scroll">
      <DetailPartner userData={userData} />
    </div>
  );
};

export default MoreInfo;
