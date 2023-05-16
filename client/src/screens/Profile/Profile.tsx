import { Typography } from "antd";
import React from "react";
import Info from "../../components/UserInfo";
import { useAppSelector } from "../../hook/useAppSelector";

const Profile = () => {
  const user = useAppSelector((state) => state.authReducer.user);

  return (
    // <div className="w-screen h-screen bg-[#fdfafa] flex flex-col items-center">
    <div className="w-screen h-screen bg-white flex flex-col items-center">
      <div className="fixed top-6 left-10">
        <div className=" bg-[url('https://inkythuatso.com/uploads/images/2021/12/logo-dai-hoc-cong-nghiep-ha-noi-inkythuatso-01-21-15-51-20.jpg')] w-[64px] h-[64px] bg-cover"></div>
      </div>
      <div className="mt-10">
        <Typography.Title level={1}>
          Hello <span className="text-[#ff4d4f]">{user?.userName}</span>. Let's
          create your profile
        </Typography.Title>
      </div>

      <div className="w-[60%] h-full mt-4">
        <Info />
      </div>
    </div>
  );
};

export default Profile;
