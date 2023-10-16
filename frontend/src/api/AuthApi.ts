import {
  ChangePasswordReq,
  CreateUserReq,
  LoginReq,
  ResetPasswordReq,
  SendForgotPasswordEmailReq,
  TokenRes,
} from "../models/User";
import { axiosInstance } from "../provider";

export const AuthApi = {
  login: async function (data: LoginReq) {
    const response = await axiosInstance.request({
      url: "/auth/login",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  register: async function (data: CreateUserReq) {
    const response = await axiosInstance.request({
      url: "/auth/register",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  changePassword: async function (data: ChangePasswordReq) {
    const response = await axiosInstance.request({
      url: "/auth/change-password",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  refreshToken: async function (data: TokenRes) {
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
  sendForgotPasswordEmail: async function (params: SendForgotPasswordEmailReq) {
    const response = await axiosInstance.request({
      url: `/auth/send-forgot-password-email`,
      method: "GET",
      params: params,
    });

    return response.data;
  },
  resetPassword: async function (data: ResetPasswordReq) {
    const response = await axiosInstance.request({
      url: "/auth/reset-password",
      method: "POST",
      data: data,
    });

    return response.data;
  },
};
