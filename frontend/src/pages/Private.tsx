import React, { useEffect } from 'react'
import { WeatherApi } from '../api/WeatherApi';
import { AuthApi } from '../api/AuthApi';

const Private = () => {
  useEffect(() => {
    AuthApi.userInfo().then(res => {
      console.log(res)
    })
  }, []);
  return (
    <div>Private</div>
  )
}

export default Private