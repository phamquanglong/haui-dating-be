import { io } from "socket.io-client";
import { WS_EVENT, WS_URL } from "../config/constant";

export interface ISocketService {
  socket: any;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string, conversationId: number) => void;
  receiveMessage: (receivedAction: any) => void;
}

export class SocketService implements ISocketService {
  public socket;
  constructor() {
    this.socket = io(WS_URL, {
      query: { token: localStorage.getItem("accessToken") },
    });
  }

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(message: string, conversationId: number) {
    this.socket.emit(WS_EVENT.SEND_MESSAGE, { message, conversationId });
  }

  receiveMessage(receivedAction: any) {
    this.socket.on(WS_EVENT.RECEIVE_MESSAGE, receivedAction);
  }
}
