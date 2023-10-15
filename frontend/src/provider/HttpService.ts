import axios from "axios";
import Common from "../utility/Common";
import AuthenticationResponseDto from "../models/User/AuthenticationResponseDto";
import { useSelector } from "react-redux";
import { RootState } from "../storage/Redux/store";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: Common.API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const accessToken = localStorage.getItem("token");
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          Common.API_BASE_URL + "/auth/refresh-token",
          { accessToken, refreshToken }
        );
        // console.log("Got new token: " + response.data.accessToken);
        console.log("got new token.");
        const token = response.data.accessToken;

        localStorage.setItem("token", token);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return axios(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.error("Could not refresh token");
        // window.location.href = "/login";
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
