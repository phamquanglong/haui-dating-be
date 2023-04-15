import React from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import { TypeHistory } from "../../../interface/user-actions";
import DetailPartner from "../Explore/DetailPartner";

const ListPeople = ({ type }: { type: string }) => {
  const listTargetUsers = useAppSelector(
    (state) => state.userActionsReducer.targetUsers
  );

  return (
    <div className="w-[100%] h-[740px] grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-scroll">
      {listTargetUsers?.map((el: any) => (
        <div className="w-[380px] h-[570px] overflow-y-scroll border-[1px] rounded-xl">
          <DetailPartner
            userData={type === TypeHistory.LIKED_ME ? el.user : el.targetUser}
          />
        </div>
      ))}
    </div>
  );
};

export default ListPeople;
