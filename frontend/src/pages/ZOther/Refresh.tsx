import React, { useEffect } from "react";
import { AuthApi } from "../../api/AuthApi";
import { TokenRes } from "../../models/User";

const Refresh = () => {
  useEffect(() => {
    const data: TokenRes = {
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
