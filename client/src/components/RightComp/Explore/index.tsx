import React, { useEffect } from "react";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import {
  BsArrowRightSquare,
  BsArrowLeftSquare,
  BsArrowDownSquare,
  BsArrowUpSquare,
} from "react-icons/bs";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { callApiGetSuggestUsers } from "../../../reducer/user.reducer";

const Explore = () => {
  const dispatch = useAppDispatch();
  const listSuggestUsers = useAppSelector(
    (state) => state.userReducer.listSuggestUsers
  );
  const loadingList = useAppSelector((state) => state.userReducer.loadingList);

  useEffect(() => {
    dispatch(callApiGetSuggestUsers());
  }, []);

  return (
    <div className="w-full h-full  flex flex-col justify-start items-center overflow-x-hidden ">
      <div className=" bg-[url('https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-cong-nghiep-ha-noi-inkythuatso-01-21-15-51-20.jpg')] w-[64px] h-[64px] bg-cover"></div>
      <div className="h-[75%] mt-6 flex justify-center items-center">
        {listSuggestUsers.map((user, index) => (
          <TinderCard
            // className={`absolute ${
            //   index === listSuggestUsers.length-1 ? "" : "hidden"
            // }`}
            className="absolute"
            key={user.id}
            preventSwipe={["up", "down"]}
          >
            <Card userData={user} width="w-[400px]" height="h-[600px]" />
          </TinderCard>
        ))}
      </div>
      <div className="w-full h-[10%] text-gray-400 mt-4 flex justify-center items-center">
        <div className="flex mr-10">
          <BsArrowLeftSquare className="text-xl mr-1" />
          <p>Nope</p>
        </div>
        <div className="flex mr-10">
          <BsArrowRightSquare className="text-xl mr-1" />
          <p>Like</p>
        </div>
        <div className="flex mr-10">
          <BsArrowUpSquare className="text-xl mr-1" />
          <p>Open profile</p>
        </div>
        <div className="flex">
          <BsArrowDownSquare className="text-xl mr-1" />
          <p>Close profile</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
