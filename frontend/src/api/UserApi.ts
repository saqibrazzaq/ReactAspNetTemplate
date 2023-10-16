import {
  AddRoleReq,
  CreateUserReq,
  RemoveRoleReq,
  SearchUsersReq,
  VerifyEmailReq,
} from "../models/User";

import { axiosInstance } from "../provider";

export const UserApi = {
  verifyEmail: async function (data: VerifyEmailReq) {
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
  search: async function (data: SearchUsersReq) {
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
  createUser: async function (data: CreateUserReq) {
    const response = await axiosInstance.request({
      url: "/Users",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  addRoleToUser: async function (data: AddRoleReq) {
    const response = await axiosInstance.request({
      url: "/Users/add-role",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  removeRoleFromUser: async function (data: RemoveRoleReq) {
    const response = await axiosInstance.request({
      url: "/Users/remove-role",
      method: "DELETE",
      data: data,
    });

    return response.data;
  },
  getAllRoles: async function () {
    const response = await axiosInstance.request({
      url: `/Users/roles`,
      method: "GET",
    });

    return response.data;
  },
};
