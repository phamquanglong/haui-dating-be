import React from "react";
import CircleButton from "../Button/CircleButton";
import { TbCards } from "react-icons/tb";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { setComponentAction } from "../../reducer/layout.reducer";
import { EXPLORE } from "../../config/constant";

const Explore = () => {
  const dispatch = useAppDispatch();
  const handleExplore = () => {
    dispatch(setComponentAction(EXPLORE));
  };

  return (
    <div className="h-full w-full bg-red-100 px-8 flex items-center">
      <CircleButton
        className="border-rose-500 border-[4px] w-20 h-20 bg-red-50 flex-shrink-0"
        onClick={handleExplore}
      >
        <TbCards className="text-rose-500 font-medium text-5xl" />
      </CircleButton>
      <div className="ml-6">
        <h5 className="font-bold text-xl">Explore New Matches</h5>
        <p className="text-gray-500 mt-1">
          Start swiping to connect with new people.
        </p>
      </div>
    </div>
  );
};

export default Explore;