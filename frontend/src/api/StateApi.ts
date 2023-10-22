import { StateEditReq, StateSearchReq } from "../models/Country";
import { axiosInstance } from "../provider";

export const StateApi = {
  create: async function (data?: StateEditReq) {
    const response = await axiosInstance.request({
      url: "/States",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (stateId?: string, data?: StateEditReq) {
    const response = await axiosInstance.request({
      url: "/States/" + stateId,
      method: "PUT",
      data: data,
    });

    return response.data;
  },
  delete: async function (stateId?: string) {
    const response = await axiosInstance.request({
      url: `/States/` + stateId,
      method: "DELETE",
    });

    return response.data;
  },
  get: async function (stateId?: string) {
    const response = await axiosInstance.request({
      url: `/States/` + stateId,
      method: "GET",
    });

    return response.data;
  },
  search: async function (searchParams?: StateSearchReq) {
    const response = await axiosInstance.request({
      url: "/States/search",
      method: "GET",
      params: searchParams,
    });

    return response.data;
  },
};
