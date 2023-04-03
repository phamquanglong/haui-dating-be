import React from "react";
import { CHATTING, EXPLORE, LIKE, SETTING } from "../../config/constant";
import { useAppSelector } from "../../hook/useAppSelector";
import Conversation from "./Conversation";
import Explore from "./Explore";
import Like from "./Like";
import Setting from "./Setting";

function RightComp() {
  const component = useAppSelector((state) => state.layoutReducer.component);
  return (
    <div className="h-screen w-full bg-white p-8">
      {component === EXPLORE && <Explore />}
      {component === SETTING && <Setting />}
      {component === CHATTING && <Conversation />}
      {component === LIKE && <Like />}
    </div>
  );
}

export default RightComp;
