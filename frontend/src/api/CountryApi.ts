import { CountryEditReq, CountrySearchReq } from "../models/Country";
import { axiosInstance } from "../provider";

export const CountryApi = {
  create: async function (data?: CountryEditReq) {
    const response = await axiosInstance.request({
      url: "/Countries",
      method: "POST",
      data: data,
    });

    return response.data;
  },
  update: async function (countryId?: string, data?: CountryEditReq) {
    const response = await axiosInstance.request({
      url: "/Countries/" + countryId,
      method: "PUT",
      data: data,
    });

    return response.data;
  },
  delete: async function (countryId?: string) {
    const response = await axiosInstance.request({
      url: `/Countries/` + countryId,
      method: "DELETE",
    });

    return response.data;
  },
  get: async function (countryId?: string) {
    const response = await axiosInstance.request({
      url: `/Countries/` + countryId,
      method: "GET",
    });

    return response.data;
  },
  getWithStateCount: async function (countryId?: string) {
    const response = await axiosInstance.request({
      url: "/Countries/" + countryId + "/get-with-state-count/",
      method: "GET",
    });

    return response.data;
  },
  search: async function (searchParams?: CountrySearchReq) {
    const response = await axiosInstance.request({
      url: "/countries/search",
      method: "GET",
      params: searchParams,
    });

    return response.data;
  },
  searchWithStateCount: async function (searchParams: CountrySearchReq) {
    const response = await axiosInstance.request({
      url: "/countries/search-with-state-count",
      method: "GET",
      params: searchParams,
    });

    return response.data;
  },
};
