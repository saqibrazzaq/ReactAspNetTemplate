import React, { useEffect } from "react";
import { WeatherApi } from "../../api/WeatherApi";
import { AuthApi } from "../../api/AuthApi";
import { toastNotify } from "../../Helper";

const Private = () => {
  useEffect(() => {
    AuthApi.userInfo()
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        toastNotify(error.message, "error");
      });
  }, []);
  return <div>Private</div>;
};

export default Private;
