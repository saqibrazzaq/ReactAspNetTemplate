import React, { useEffect } from "react";
import { WeatherApi } from "../../api/WeatherApi";

const Public = () => {
  useEffect(() => {
    WeatherApi.public().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>Public</div>;
};

export default Public;
