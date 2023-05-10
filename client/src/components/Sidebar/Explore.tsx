import React from "react";
import CircleButton from "../Button/CircleButton";
import { TbCards } from "react-icons/tb";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { actionSetComponent } from "../../reducer/layout.reducer";
import { EXPLORE } from "../../config/constant";

const Explore = () => {
  const dispatch = useAppDispatch();
  const handleExplore = () => {
    dispatch(actionSetComponent(EXPLORE));
  };

  return (
    <div className="h-full w-full bg-red-100 md:px-6 lg:px-8 flex items-center">
      <CircleButton
        className="border-primaryColor md:border-[3px] lg:border-[4px] md:w-16 md:h-16 lg:w-20 lg:h-20 bg-red-50 flex-shrink-0"
        onClick={handleExplore}
      >
        <TbCards className="text-primaryColor font-medium md:text-4xl lg:text-5xl" />
      </CircleButton>
      <div className="ml-6">
        <h5 className="font-bold md:text-base lg:text-xl">
          Explore New Matches
        </h5>
        <p className="text-gray-500 mt-1 md:text-xs lg:text-base">
          Start swiping to connect with new people.
        </p>
      </div>
    </div>
  );
};

export default Explore;
