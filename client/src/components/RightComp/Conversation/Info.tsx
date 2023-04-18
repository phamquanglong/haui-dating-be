import React from "react";
import { useAppSelector } from "../../../hook/useAppSelector";
import DetailPartner from "../Explore/DetailPartner";

const Info = () => {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );

  const partner =
    selectedConversation?.userOne?.id === currentUser?.id
      ? selectedConversation?.userTwo
      : selectedConversation?.userOne;

  return (
    <div className="w-[400px] h-[calc(100vh_-_4rem)] rounded-r-lg border-[0.125px] p-4">
      <div className="h-full flex flex-col overflow-y-scroll">
        <DetailPartner userData={partner} />
      </div>
    </div>
  );
};

export default Info;
