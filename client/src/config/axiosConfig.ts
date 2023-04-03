import axios from "axios";
import { get } from "lodash";
import { toast } from "react-toastify";

const ApiService = axios.create({
  // baseURL: appConfig.apiUrl,
  timeout: 30000,
});

// handle error
ApiService.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (get(error, "response.status") === 400) {
      const data = get(error, "response.data");
      if (data) toast.error(data.message);
      else toast.error(get(error, "message"));
    } else if (get(error, "response.status") === 401) {
      toast.error("Phiên làm việc hết hạn. Vui lòng làm mới trình duyệt");
      window.location.href = "/login";
    } else if (get(error, "response.status") >= 500) {
      toast.error("Máy chủ gặp sự cố. Vui lòng thử lại sau");
    }

    return Promise.reject(error);
  }
);

// get token
if (localStorage.getItem("accessToken"))
  ApiService.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("accessToken");

export default ApiService;

export const ApiServiceSetAuthToken = (token: any) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("isLogin", JSON.stringify(true));
    ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLogin");
    delete ApiService.defaults.headers.common["Authorization"];
  }
};
