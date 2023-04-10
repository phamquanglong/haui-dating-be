import React from "react";
import { Avatar, List } from "antd";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { setComponentAction } from "../../reducer/layout.reducer";
import { CHATTING } from "../../config/constant";

const data = [
  {
    title: "abc abc",
    desc: "test test test",
    avt: "https://picsum.photos/600/600",
  },
  {
    title: "abc abc",
    desc: "test test test",
    avt: "https://picsum.photos/600/600",
  },
];

const Conversations = () => {
  const dispatch = useAppDispatch();
  const handleChat = () => {
    dispatch(setComponentAction(CHATTING));
  };
  return (
    <div className="h-full w-full bg-white flex flex-col justify-start items-center">
      <div className="flex justify-start w-full px-4 py-2">
        <h6 className="font-bold text-lg text-rose-500">Message</h6>
      </div>
      <div className=" h-[75vh] w-full px-2 overflow-y-scroll">
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item
              onClick={handleChat}
              className={`${
                index === 0 ? "bg-red-50 " : ""
              } rounded-lg hover:bg-red-50`}
            >
              <List.Item.Meta
                avatar={<Avatar className="w-20 h-20 ml-2" src={item.avt} />}
                title={<h5 className="font-bold mt-4 text-xl">{item.title}</h5>}
                description={item.desc}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Conversations;
