import ApiService from "../config/axiosConfig";

export default class HobbyApi {
  static getAllHobbies() {
    return ApiService.get("hobbies");
  }
}
