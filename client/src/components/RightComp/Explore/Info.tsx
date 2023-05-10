import React from "react";
import { Carousel } from "antd";
import { IUser } from "../../../interface/User";
import { getDistanceFromLatLonInKm, getUserOld } from "../../../utils";
import { useAppSelector } from "../../../hook/useAppSelector";

const Info = ({
  userData,
  className,
}: {
  userData?: IUser;
  className: string;
}) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);

  return (
    <div className={`w-full h-full relative ${className}`}>
      <div className="absolute top-0 w-full h-[10%] z-[2] rounded-t-xl flex flex-col mt-1 items-start px-4">
        <h3 className="text-2xl text-white font-semibold">
          {userData?.profile?.fullName || ""},{" "}
          <span>
            {userData?.profile?.birthday
              ? `${getUserOld(userData.profile.birthday)}`
              : ""}
          </span>
        </h3>
        <p className="text-white text-lg -mt-1">
          {userData && currentUser
            ? `${getDistanceFromLatLonInKm(
                currentUser?.profile?.latitude,
                currentUser?.profile?.longitude,
                userData?.profile?.latitude,
                userData?.profile?.longitude
              )} kms`
            : ""}
        </p>
      </div>
      <div className="w-full h-[600px] rounded-xl bg-gradient-to-b from-black from-0% via-slate-50 via-10% to-white to-100% opacity-20  absolute top-0 z-[1]"></div>
      <Carousel autoplay>
        {userData?.images.map((image) => (
          <div className="w-full h-[600px] rounded-xl ">
            <img
              className="w-full h-full object-cover rounded-xl pointer-events-none"
              src={image.imageUrl}
              alt={image.imageUrl}
            ></img>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Info;
