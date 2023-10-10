import ChangePasswordRequestDto from "../models/User/ChangePasswordRequestDto";
import ForgotPasswordDto from "../models/User/ForgotPasswordDto";
import RefreshTokenDto from "../models/User/RefreshTokenDto";
import ResetPasswordDto from "../models/User/ResetPasswordDto";
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
  sendForgotPasswordEmail: async function (params: ForgotPasswordDto) {
    const response = await axiosInstance.request({
      url: `/auth/send-forgot-password-email`,
      method: "GET",
      params: params,
    });

    return response.data;
  },
  resetPassword: async function (data: ResetPasswordDto) {
    const response = await axiosInstance.request({
      url: "/auth/reset-password",
      method: "POST",
      data: data,
    });

    return response.data;
  },
};
