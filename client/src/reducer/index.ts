import { authReducer } from "./auth.reducer";
import { layoutReducer } from "./layout.reducer";
import { hobbyReducer } from "./hobby.reducer";
import { userReducer } from "./user.reducer";
import { userActionsReducer } from "./user-actions.reducer";
import { conversationsReducer } from "./conversations.reducer";
import { messagesReducer } from "./messages.reducer";
import { socketReducer } from "./socket.reducer";

export const rootReducer = {
  authReducer,
  layoutReducer,
  hobbyReducer,
  userReducer,
  userActionsReducer,
  conversationsReducer,
  messagesReducer,
  socketReducer,
};
