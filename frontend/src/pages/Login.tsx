import UserLoginDto from "../models/User/UserLoginDto";
import { AuthApi } from "../api/AuthApi";
import { useState } from "react";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import AuthenticationResponseDto from "../models/User/AuthenticationResponseDto";
import ErrorDetails from "../models/Error/ErrorDetails";
import * as Yup from "yup";
import YupPassword from "yup-password";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Field, Formik, replace } from "formik";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../storage/Redux/userAuthSlice";
import toastNotify from "../Helper/toastNotify";

YupPassword(Yup); // extend yup

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let loginData = new UserLoginDto("saqibrazzaq@gmail.com", "Saqib123@");

  const submitForm = (values: UserLoginDto) => {
    setError("");
    AuthApi.login(values)
      .then((res) => {
        let authRes: AuthenticationResponseDto = res;
        console.log("In login.tsx");
        console.log(authRes);
        localStorage.setItem("token", authRes.accessToken ?? "");
        localStorage.setItem("refreshToken", authRes.refreshToken ?? "");
        dispatch(setLoggedInUser(authRes));
        navigate("/");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Login service failed.");
        console.log("Error: " + err?.response?.data?.Message);
        toastNotify(errDetails?.Message ?? "", "error");
      });
  };

  // const updateUserInfoAndGotoHomepage = () => {
  //   AuthApi.userInfo().then((res) => {
  //     localStorage.setItem("user", JSON.stringify(res));

  //     setTimeout(() => {
  //       navigate("/", { replace: true });
  //     }, 1 * 1000);
  //   });
  // };

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
  });

  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Formik
          initialValues={loginData}
          onSubmit={(values) => {
            submitForm(values);
          }}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <Heading fontSize={"2xl"}>Sign in to your account</Heading>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field as={Input} id="email" name="email" type="email" />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password && touched.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Field
                  as={Input}
                  id="password"
                  name="password"
                  type="password"
                />
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link as={RouteLink} to="/forgot-password" color={"blue.500"}>
                    Forgot password?
                  </Link>
                </Stack>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Text>Don't have an account?</Text>
                  <Link as={RouteLink} to="/register" color={"blue.500"}>
                    Create Account
                  </Link>
                </Stack>
                <Button type="submit" colorScheme={"blue"} variant={"solid"}>
                  Sign in
                </Button>
              </Stack>
            </form>
          )}
        </Formik>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Login Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Login;
