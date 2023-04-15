import React from "react";
import { Avatar, Empty, List } from "antd";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { setComponentAction } from "../../reducer/layout.reducer";
import { CHATTING } from "../../config/constant";
import { useAppSelector } from "../../hook/useAppSelector";
import { isEmpty } from "lodash";

const Conversations = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.authReducer.user);
  const listConversations = useAppSelector(
    (state) => state.conversationsReducer.listConversations
  );

  const handleChat = () => {
    dispatch(setComponentAction(CHATTING));
  };

  // const data = [
  //   {
  //     title: {},
  //     desc: "test test test",
  //     avt: "https://picsum.photos/600/600",
  //   },
  //   {
  //     title: "abc abc",
  //     desc: "test test test",
  //     avt: "https://picsum.photos/600/600",
  //   },
  // ];

  const data = listConversations?.map((conv: any) => {
    const data = {
      title:
        conv?.userOne?.id !== currentUser?.id
          ? conv?.userOne?.profile?.fullName
          : conv?.userTwo?.profile?.fullName,
      desc: conv?.latestMessage,
      avt:
        conv?.userOne?.id !== currentUser?.id
          ? conv?.userOne?.images[0]?.imageUrl
          : conv?.userTwo?.images[0]?.imageUrl,
    };
    return data;
  });

  return (
    <div className="h-full w-full bg-white flex flex-col justify-start items-center">
      <div className="flex justify-start w-full px-4 py-2">
        <h6 className="font-bold text-lg text-primaryColor">Messages</h6>
      </div>
      <div className=" h-[75vh] w-full px-2 overflow-y-scroll">
        {!isEmpty(data) ? (
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item: any, index) => (
              <List.Item
                onClick={handleChat}
                className={`${
                  index === 0 ? "bg-red-50 " : ""
                } rounded-lg hover:bg-red-50`}
              >
                <List.Item.Meta
                  avatar={<Avatar className="w-20 h-20 ml-2" src={item.avt} />}
                  title={
                    <h5 className="font-bold mt-4 text-xl">{item.title}</h5>
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
