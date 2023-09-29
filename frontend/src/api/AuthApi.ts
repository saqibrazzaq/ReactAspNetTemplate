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
  // private: async function () {
  //   const response = await axiosInstance.request({
  //     url: `/WeatherForecast/test`,
  //     method: "GET",
  //   });

  //   return response.data;
  // },
};
