import { io } from "socket.io-client";
import { WS_EVENT, WS_URL } from "../config/constant";

export interface ISocketService {
  socket: any;
  connect: () => void;
  disconnect: () => void;
  sendMessage: (message: string, conversationId: number) => void;
  receiveMessage: (listener: any) => void;
  setTypingStatus: (status: boolean, conversationId: number) => void;
  receiveTypingStatus: (listener: any) => void;
  receiveListUserOnline: (listener: any) => void;
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

  receiveMessage(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_MESSAGE, listener);
  }

  setTypingStatus(isTyping: boolean, conversationId: number) {
    this.socket.emit(WS_EVENT.TYPING, { isTyping, conversationId });
  }

  receiveTypingStatus(listener: any) {
    this.socket.on(WS_EVENT.TYPING_RES, listener);
  }

  receiveListUserOnline(listener: any) {
    this.socket.on(WS_EVENT.RECEIVE_USERS_ONLINE, listener);
  }
}
