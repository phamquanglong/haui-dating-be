import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RightComp from "../../components/RightComp";
import Sidebar from "../../components/Sidebar";
import { useAppSelector } from "../../hook/useAppSelector";
import { isEmpty } from "lodash";
import {
  deleteMessageAction,
  pushNewMessageAction,
} from "../../reducer/messages.reducer";
import { actionSortConversation } from "../../reducer/conversations.reducer";
import { useAppDispatch } from "../../hook/useAppDispatch";

const Home = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  if (user?.profile === null && !loading) navigate("/profile");

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveMessage((data) => {
        if (data) {
          if (selectedConversation?.id === data?.conversation?.id) {
            dispatch(pushNewMessageAction(data));
            dispatch(actionSortConversation(data?.conversation));
          }
        }
      });

      socket.receiveDeleteMessage((data) => {
        dispatch(
          deleteMessageAction({
            messId: data?.messId,
            userDelete: data?.userDelete,
          })
        );
      });
    }
  }, [socket, dispatch, selectedConversation?.id]);
  return (
    <div className="flex flex-row overflow-x-hidden bg-black w-screen h-screen">
      <Sidebar />
      <RightComp />
    </div>
  );
};

export default Home;
