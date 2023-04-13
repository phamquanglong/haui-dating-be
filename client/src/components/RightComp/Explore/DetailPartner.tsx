import React from "react";
import { getDistanceFromLatLonInKm, getUserOld } from "../../../utils";
import { Carousel } from "antd";
import { IUser } from "../../../interface/User";
import { useAppSelector } from "../../../hook/useAppSelector";

const DetailPartner = ({ userData }: { userData?: IUser }) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);
  return (
    <div className="flex flex-col bg-white">
      <Carousel autoplay>
        {userData?.images.map((image) => (
          <div className="w-full h-[400px] rounded-t-xl ">
            <img
              className="w-full h-full object-cover rounded-t-xl pointer-events-none"
              src={image.imageUrl}
            ></img>
          </div>
        ))}
      </Carousel>
      <div className="w-full h-[10%] rounded-t-xl flex flex-col mt-1 items-start px-4">
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
              )} kms away`
            : ""}
        </p>
      </div>
    </div>
  );
};

export default DetailPartner;
