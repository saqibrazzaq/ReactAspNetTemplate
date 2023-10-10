import ChangePasswordRequestDto from "../models/User/ChangePasswordRequestDto";
import RefreshTokenDto from "../models/User/RefreshTokenDto";
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
  updateProfilePicture: async function (data: FormData) {
    const response = await axiosInstance.request({
      url: "/Users/update-profile-picture",
      method: "POST",
      data: data,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  },
};
