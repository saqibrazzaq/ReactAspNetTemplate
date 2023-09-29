import { useNavigate } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import UserLoginDto from "../models/User/UserLoginDto";
import { AuthApi } from "../api/AuthApi";

const Login = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();

  let loginData = new UserLoginDto("saqibrazzaq@gmail.com", "Saqib123!");
  console.log("trying to login");
  AuthApi.login(loginData).then(res => {
    console.log(res)
      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('token', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
  })

  return <>Login Page</>;
};

export default Login;
