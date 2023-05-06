import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./config/router";
import { useAppDispatch } from "./hook/useAppDispatch";
import { useAppSelector } from "./hook/useAppSelector";
import { callApiGetInfo } from "./reducer/auth.reducer";
import { initSocketAction } from "./reducer/socket.reducer";
import NotFound from "./screens/NotFound";
import { SocketService } from "./Services/Socket.service";

const App = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.authReducer.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(callApiGetInfo());
      const appSocket = new SocketService();
      appSocket.connect();
      // set socket into store
      dispatch(initSocketAction(appSocket));
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
