import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import { URL_WS } from "./config/constant";
import { routes } from "./config/router";
import { useAppDispatch } from "./hook/useAppDispatch";
import { useAppSelector } from "./hook/useAppSelector";
import { callApiGetInfo } from "./reducer/auth.reducer";
import NotFound from "./screens/NotFound";

const App = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(callApiGetInfo());
      const socket = io(URL_WS, { query: { token: accessToken } });
      socket.on("connect", () => {});
    }
  }, [accessToken, dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff4d4f",
        },
      }}
    >
      <Routes>
        {routes.map((el) => (
          <Route path={el.path} element={el.component} />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ConfigProvider>
  );
};

export default App;
