import { UserAddressEditReq } from "../models/User";
import { axiosInstance } from "../provider";

export const UserAddressApi = {
  create: async function (data?: UserAddressEditReq) {
    const response = await axiosInstance.request({
      url: "/UserAddresses",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (userAddressId?: string, data?: UserAddressEditReq) {
    const response = await axiosInstance.request({
      url: "/UserAddresses/" + userAddressId,
      method: "PUT",
      data: data,
    });

    return response.data;
  },
  delete: async function (userAddressId?: string) {
    const response = await axiosInstance.request({
      url: `/UserAddresses/` + userAddressId,
      method: "DELETE",
    });

    return response.data;
  },
  get: async function (userAddressId?: string) {
    const response = await axiosInstance.request({
      url: `/UserAddresses/` + userAddressId,
      method: "GET",
    });

    return response.data;
  },
  getAll: async function () {
    const response = await axiosInstance.request({
      url: `/UserAddresses/all`,
      method: "GET",
    });

    return response.data;
  },
};
