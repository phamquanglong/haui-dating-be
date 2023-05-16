import React, { useEffect } from "react";
import { Avatar, Empty, List } from "antd";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { actionSetComponent } from "../../reducer/layout.reducer";
import { CHATTING } from "../../config/constant";
import { useAppSelector } from "../../hook/useAppSelector";
import { find, isEmpty } from "lodash";
import { actionSelectConversation } from "../../reducer/conversations.reducer";
import { setListPartnersOnlineAction } from "../../reducer/partner.reducer";

const Conversations = () => {
  const dispatch = useAppDispatch();
  const socket = useAppSelector((state) => state.socketReducer.socket);
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const component = useAppSelector((state) => state.layoutReducer.component);
  const listConversations = useAppSelector(
    (state) => state.conversationsReducer.listConversations
  );
  const listPartnersOnline = useAppSelector(
    (state) => state.partnerReducer.listPartnersOnline
  );

  const selectedConversation = useAppSelector(
    (state) => state.conversationsReducer.selectedConversation
  );

  const handleSelectConversation = (conv: any) => {
    dispatch(actionSetComponent(CHATTING));
    dispatch(actionSelectConversation(conv));
  };

  useEffect(() => {
    if (!isEmpty(socket)) {
      socket.receiveListUserOnline((data: any) => {
        dispatch(setListPartnersOnlineAction(data));
      });
    }
  }, [socket, dispatch]);

  const data = listConversations?.map((conv: any) => {
    const item = {
      id: conv?.id,
      title:
        conv?.userOne?.id !== currentUser?.id
          ? conv?.userOne?.profile?.fullName
          : conv?.userTwo?.profile?.fullName,
      desc: conv?.latestMessage,
      avt:
        conv?.userOne?.id !== currentUser?.id
          ? conv?.userOne?.images[0]?.imageUrl
          : conv?.userTwo?.images[0]?.imageUrl,
      conv: conv,
      partnerId:
        conv?.userOne?.id !== currentUser?.id
          ? conv?.userOne?.id
          : conv?.userTwo?.id,
    };
    return item;
  });

  return (
    <div className="h-full w-full bg-white flex flex-col justify-start items-center">
      <div className="h-12 flex justify-start w-full px-4 py-2">
        <h6 className="font-bold text-base lg:text-lg text-primaryColor">
          Messages
        </h6>
      </div>
      <div className="h-[65vh] w-full px-2 overflow-y-scroll">
        {!isEmpty(data) ? (
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any, index) => (
              <List.Item
                onClick={() => handleSelectConversation(item?.conv)}
                className={`${
                  item?.id === selectedConversation?.id &&
                  component === CHATTING
                    ? "bg-red-50 "
                    : ""
                } 
                rounded-lg hover:bg-red-50`}
              >
                <List.Item.Meta
                  avatar={
                    <div className="relative">
                      <Avatar
                        key={index}
                        className="w-14 h-14 lg:w-[4.5rem] lg:h-[4.5rem] ml-2 relative"
                        src={
                          item?.avt
                            ? item?.avt
                            : "https://res.cloudinary.com/dorbkvmvo/image/upload/v1659692903/nonavt_uolnwl.jpg"
                        }
                      />
                      {find(listPartnersOnline, {
                        userId: item?.partnerId,
                      }) && (
                        <span className="bottom-1 right-1 absolute w-3 h-3  lg:w-4 lg:h-4 bg-primaryColor border-2 border-white rounded-full"></span>
                      )}
                    </div>
                  }
                  title={
                    <h5 className="font-bold mt-1 lg:mt-4 text-base lg:text-xl">
                      {item.title}
                    </h5>
                  }
                  description={item.desc}
                />
              </List.Item>
            )}
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center">
            <Empty />
          </div>
        )}
      </div>
    </div>
  );
};

export default Conversations;
