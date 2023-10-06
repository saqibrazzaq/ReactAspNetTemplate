import ChangePasswordRequestDto from "../models/User/ChangePasswordRequestDto";
import RefreshTokenDto from "../models/User/RefreshTokenDto";
import UserLoginDto from "../models/User/UserLoginDto";
import axiosInstance from "../provider/HttpService";


export const AuthApi = {
  login: async function (data: UserLoginDto) {
    const response = await axiosInstance.request({
      url: "/auth/login",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  changePassword: async function (data: ChangePasswordRequestDto) {
    const response = await axiosInstance.request({
      url: "/auth/change-password",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  refreshToken: async function (data: RefreshTokenDto) {
    const response = await axiosInstance.request({
      url: "/auth/refresh-token",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  userInfo: async function () {
    const response = await axiosInstance.request({
      url: `/auth/info`,
      method: "GET",
    });

    return response.data;
  },
};
