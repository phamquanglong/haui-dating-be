export interface Message {
  conversationId: number;
  message: string;
}

export interface SetTypingStatusRequest {
  conversationId: number;
  isTyping: boolean;
}
