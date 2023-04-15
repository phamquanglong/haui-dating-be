import ApiService from "../config/axiosConfig";

export default class ConversationApi {
  static getAllConversation() {
    return ApiService.get("conversations");
  }
}
