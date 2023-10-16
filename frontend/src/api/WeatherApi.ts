import { axiosInstance } from "../provider";

export const WeatherApi = {
  public: async function () {
    const response = await axiosInstance.request({
      url: "/WeatherForecast",
      method: "GET",
    });

    return response.data;
  },
  private: async function () {
    const response = await axiosInstance.request({
      url: `/WeatherForecast/test`,
      method: "GET",
    });

    return response.data;
  },
};
