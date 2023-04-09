import { AxiosResponse } from "axios";
import ApiService from "../config/axiosConfig";
import { IUser, IUserInformationRequest } from "../interface/User";

export default class UserApi {
  static getInfo(): Promise<AxiosResponse<IUser>> {
    return ApiService.get("users/me");
  }

  static register(body: { userName: string; email: string; password: string }) {
    return ApiService.post("auth/register", body);
  }

  static login(body: { userName: string; password: string }) {
    return ApiService.post("auth/login", body);
  }

  static uploadImage(file: any) {
    const formData = new FormData();
    formData.append("file", file);
    return ApiService.post("users/upload", formData);
  }

  static postUserInformation(
    body: IUserInformationRequest
  ): Promise<AxiosResponse<IUser>> {
    return ApiService.post("users/information", body);
  }
}
