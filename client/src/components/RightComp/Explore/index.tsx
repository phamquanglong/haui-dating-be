import React, { useEffect, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";
import Card from "./Card";
import { BsArrowDownSquare, BsArrowUpSquare } from "react-icons/bs";

import { MdOutlineSwipeLeft, MdOutlineSwipeRight } from "react-icons/md";
import { useAppSelector } from "../../../hook/useAppSelector";
import { useAppDispatch } from "../../../hook/useAppDispatch";
import { callApiGetSuggestUsers } from "../../../reducer/user.reducer";
import { callApiCreateAction } from "../../../reducer/user-actions.reducer";
import { isEmpty } from "lodash";
import { Empty } from "antd";
import { callApiGetInfo } from "../../../reducer/auth.reducer";
import { callApiGetAllConversations } from "../../../reducer/conversations.reducer";

const Explore = () => {
  const dispatch = useAppDispatch();
  const listSuggestUsers = useAppSelector(
    (state) => state.userReducer.listSuggestUsers
  );

  useEffect(() => {
    dispatch(callApiGetSuggestUsers());
  }, [dispatch]);

  const [currentIndex, setCurrentIndex] = useState(listSuggestUsers.length - 1);
  const [, setLastDirection] = useState();

  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex);

  const childRefs: React.RefObject<any>[] = useMemo(
    () =>
      Array(listSuggestUsers.length)
        .fill(0)
        .map((i: any) => React.createRef()),
    [listSuggestUsers]
  );

  const updateCurrentIndex = (val: any) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const swiped = (direction: any, nameToDelete: any, index: any) => {
    dispatch(
      callApiCreateAction({
        action: direction === "right" ? "like" : "dislike",
        targetUserId: nameToDelete,
      })
    ).then(() => {
      dispatch(callApiGetSuggestUsers());
      dispatch(callApiGetInfo());
      dispatch(callApiGetAllConversations());
    });
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  return (
    <div className="w-full h-full  flex flex-col justify-start items-center overflow-x-hidden">
      <div className=" bg-[url('https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-cong-nghiep-ha-noi-inkythuatso-01-21-15-51-20.jpg')] w-[64px] h-[64px] bg-cover"></div>
      <div className="h-[75%] mt-6 flex justify-center items-center">
        {isEmpty(listSuggestUsers) && <Empty />}
        {!isEmpty(listSuggestUsers) &&
          listSuggestUsers.map((user, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="absolute"
              onSwipe={(dir) => swiped(dir, user.id, index)}
              key={user.id}
              preventSwipe={["up", "down"]}
            >
              <Card userData={user} width="w-[400px]" height="h-[600px]" />
            </TinderCard>
          ))}
      </div>
      <div className="w-full h-[10%] text-gray-400 mt-4 flex justify-center items-center">
        <div className="flex mr-10 justify-center items-center">
          <MdOutlineSwipeLeft className="text-xl mr-1 -mt-1" />
          <p>Nope</p>
        </div>
        <div className="flex mr-10 justify-center items-center">
          <MdOutlineSwipeRight className="text-xl mr-1 -mt-1" />
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
