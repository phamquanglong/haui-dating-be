import React, { useEffect } from "react";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { callApiGetAllConversations } from "../../reducer/conversations.reducer";
import Conversations from "./Conversations";
import Explore from "./Explore";
import Header from "./Header";

const Sidebar = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(callApiGetAllConversations());
  }, [dispatch]);

  return (
    <div className="h-screen w-1/4 grid grid-rows-sidebar border-r-[1px] border-stone-300">
      <Header />
      <Explore />
      <Conversations />
    </div>
  );
};

export default Sidebar;
