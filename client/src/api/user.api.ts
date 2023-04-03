import ApiService from "../config/axiosConfig";

export default class UserApi {
  static getInfo() {
    return ApiService.get("users/me");
  }

  static register(body: { userName: string; email: string; password: string }) {
    return ApiService.post("auth/register", body);
  }

  static login(body: { userName: string; password: string }) {
    return ApiService.post("auth/login", body);
  }
}
