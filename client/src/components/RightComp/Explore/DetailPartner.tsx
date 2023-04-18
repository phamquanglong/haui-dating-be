import React from "react";
import {
  getDistanceFromLatLonInKm,
  getRandomColor,
  getUserOld,
} from "../../../utils";
import { Carousel, Divider, Space, Tag } from "antd";
import { IUser } from "../../../interface/User";
import { useAppSelector } from "../../../hook/useAppSelector";
import { GoLocation } from "react-icons/go";

const DetailPartner = ({ userData }: { userData?: IUser }) => {
  const currentUser = useAppSelector((state) => state.authReducer.user);

  return (
    <>
      <Carousel autoplay>
        {userData?.images?.map((image) => (
          <div className="w-full h-[400px] rounded-t-xl ">
            <img
              className="w-full h-full object-cover rounded-xl pointer-events-none"
              src={image.imageUrl}
              alt={image.imageUrl}
            ></img>
          </div>
        ))}
      </Carousel>
      <div className="w-full h-10 rounded-t-xl flex justify-between mt-4 items-end px-4">
        <h3 className="text-2xl text-stone-600 font-semibold">
          {userData?.profile?.fullName || ""},{" "}
          <span>
            {userData?.profile?.birthday
              ? `${getUserOld(userData.profile.birthday)}`
              : ""}
          </span>
        </h3>
        <div className=" flex border-[1.5px] border-stone-500 rounded-3xl px-[4px] items-center">
          <GoLocation className="text-stone-600  mr-1" />
          <p className="text-stone-600 text-lg ">
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

      <div className="px-4">
        <p className="text-stone-600">
          <span className="font-semibold">Gender: </span>
          {userData?.profile?.gender.toUpperCase() || ""}
        </p>
        <p className="text-stone-600">
          <span className="font-semibold">Birthday: </span>
          {userData?.profile?.birthday.split("/").reverse().join("/") || ""}
        </p>
        <p className="text-stone-600">
          <span className="font-semibold">Hobbies: </span>
        </p>
        <Space size={[0, 8]} wrap>
          {userData?.userHobbies?.map((userHobby) => (
            <Tag color={getRandomColor()}>{userHobby.hobby?.name}</Tag>
          ))}
        </Space>
      </div>

      <Divider></Divider>

      <div className="px-4">
        <p className="text-stone-600">
          <span className="font-semibold">About me </span>
        </p>
        <p className="text-stone-600">{userData?.profile?.bio || ""}</p>
      </div>
    </>
  );
};

export default DetailPartner;
