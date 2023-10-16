import axios from "axios";
import Common from "../utility/Common";

const axiosInstance = axios.create({
  baseURL: Common.API_BASE_URL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["request-startTime"] = new Date().getTime();
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
  (response) => {
    // Calculate response time
    const currentTime = new Date().getTime();
    const startTime = response.config.headers["request-startTime"];
    response.headers["request-duration"] = currentTime - startTime;

    console.log(
      millisToMinutesAndSeconds(response.headers["request-duration"]) +
        " - " +
        response.request.responseURL
    );
    return response;
  },
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

function millisToMinutesAndSeconds(millis: string) {
  var minutes = Math.floor(parseInt(millis) / 60000);
  var seconds = parseInt(((parseInt(millis) % 60000) / 1000).toFixed(0));

  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

export default axiosInstance;
