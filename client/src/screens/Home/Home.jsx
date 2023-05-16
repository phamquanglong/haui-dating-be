import React from "react";
import { useNavigate } from "react-router-dom";
import RightComp from "../../components/RightComp";
import Sidebar from "../../components/Sidebar";
import { useAppSelector } from "../../hook/useAppSelector";

const Home = () => {
  const user = useAppSelector((state) => state.authReducer.user);
  const loading = useAppSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();

  if (user?.profile === null && !loading) navigate("/profile");

  return (
    <div className="flex flex-row overflow-x-hidden bg-black w-screen h-screen">
      <Sidebar />
      <RightComp />
    </div>
  );
};

export default Home;
