import React, { useEffect } from 'react'
import { WeatherApi } from '../api/WeatherApi';

const Private = () => {
  useEffect(() => {
    WeatherApi.private().then(res => {
      console.log(res)
    })
  }, []);
  return (
    <div>Private</div>
  )
}

export default Private