import { createAction, createReducer } from "@reduxjs/toolkit";
import { ISocketService } from "../Services/Socket.service";

interface State {
  socket: ISocketService;
}

const initState: State = {
  socket: {} as ISocketService,
};

export const initSocketAction = createAction<ISocketService>("SOCKET.INIT");

export const socketReducer = createReducer(initState, (builder) => {
  builder.addCase(initSocketAction, (state, { payload }) => {
    state.socket = payload;
  });
});
