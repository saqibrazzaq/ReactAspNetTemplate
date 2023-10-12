import React, { useEffect } from "react";
import { WeatherApi } from "../../api/WeatherApi";
import toastNotify from "../../Helper/toastNotify";

const Public = () => {
  useEffect(() => {
    WeatherApi.public().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Public</div>;
};

export default Public;
