///////////////
const PRIVATE_ROUTE = "private-route";
const PUBLIC_ROUTE = "public-route";

const EXPLORE = "explore";
const SETTING = "setting";
const CHATTING = "chatting";
const LIKE = "like";

export { PRIVATE_ROUTE, PUBLIC_ROUTE, EXPLORE, SETTING, CHATTING, LIKE };

export const LIST_RANDOM_COLOR = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "green",
  "cyan",
  "blue",
  "geekblue",
  "purple",
];

export const KEY_CODE = {
  ARROW_LEFT: 37,
  ARROW_RIGHT: 39,
  ARROW_UP: 38,
  ARROW_DOWN: 40,
  ENTER: 13,
};

export const WS_URL = "http://localhost:8080";

export const WS_EVENT = {
  SEND_MESSAGE: "send_message",
  RECEIVE_MESSAGE: "receive_message",

  TYPING: "typing",
  TYPING_RES: "typing_response",

  RECEIVE_USERS_ONLINE: "receive_users_online",

  SEEN_MESSAGE: "seen_message",
  RECEIVE_UPDATE_IS_SEEN_MESSAGE: "receive_update_is_seen_message",

  DELETE_MESSAGE: "delete_message",
  RECEIVE_DELETE_MESSAGE: "receive_delete_message",
};
