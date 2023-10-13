import ChangePasswordRequestDto from "../models/User/ChangePasswordRequestDto";
import CreateUserRequestDto from "../models/User/CreateUserRequestDto";
import RefreshTokenDto from "../models/User/RefreshTokenDto";
import SearchUsersRequestParameters from "../models/User/SearchUsersRequestParameters";
import UserLoginDto from "../models/User/UserLoginDto";
import VerifyEmailDto from "../models/User/VerifyEmailDto";
import axiosInstance from "../provider/HttpService";

export const UserApi = {
  verifyEmail: async function (data: VerifyEmailDto) {
    const response = await axiosInstance.request({
      url: "/Users/verify-email",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  sendVerificationEmail: async function () {
    const response = await axiosInstance.request({
      url: `/Users/send-verification-email`,
      method: "GET",
    });

    return response.data;
  },
  search: async function (data: SearchUsersRequestParameters) {
    const response = await axiosInstance.request({
      url: `/Users/search`,
      method: "GET",
      params: data,
    });

    return response.data;
  },
  getUserByName: async function (username: string) {
    const response = await axiosInstance.request({
      url: `/Users/get/` + username,
      method: "GET",
    });

    return response.data;
  },
  deleteUser: async function (username: string) {
    const response = await axiosInstance.request({
      url: `/Users/` + username,
      method: "DELETE",
    });

    return response.data;
  },
  updateProfilePicture: async function (data: FormData) {
    const response = await axiosInstance.request({
      url: "/Users/update-profile-picture",
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
  createUser: async function (data: CreateUserRequestDto) {
    const response = await axiosInstance.request({
      url: "/Users",
      method: "POST",
      data: data,
    });

    return response.data;
  },
};
