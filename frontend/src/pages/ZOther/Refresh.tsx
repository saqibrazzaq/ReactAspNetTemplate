import React, { useEffect } from "react";
import { AuthApi } from "../../api/AuthApi";
import RefreshTokenDto from "../../models/User/RefreshTokenDto";

const Refresh = () => {
  useEffect(() => {
    const data: RefreshTokenDto = {
      accessToken: localStorage.getItem("token") ?? "",
      refreshToken: localStorage.getItem("refreshToken") ?? "",
    };
    AuthApi.refreshToken(data).then((res) => {
      const token = res.accessToken;
      console.log(token);
    });
  }, []);
  return <div>Refresh</div>;
};

export default Refresh;
