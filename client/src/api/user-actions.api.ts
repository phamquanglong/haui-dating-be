import ApiService from "../config/axiosConfig";
import { IUserActionRequest } from "../interface/user-actions";

export default class UserActionsApi {
  static getHistory(type: string) {
    return ApiService.get(`user-actions/history?type=${type}`);
  }
  static createAction(body: IUserActionRequest) {
    return ApiService.post("user-actions", body);
  }
}
