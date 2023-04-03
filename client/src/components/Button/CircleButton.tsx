import React from "react";

const CircleButton = ({ className, children, ...props }: any) => {
  return (
    <div
      className={
        "w-10 h-10 rounded-full border-[0.125px] flex justify-center items-center cursor-pointer hover:opacity-70 " +
        className
      }
      {...props}
    >
      {children}
    </div>
  );
};

export default CircleButton;
