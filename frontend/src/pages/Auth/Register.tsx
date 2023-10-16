import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { AuthApi } from "../../api/AuthApi";
import ErrorDetails from "../../models/Error/ErrorDetails";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../storage/Redux/userAuthSlice";
import { ErrorAlert, SuccessAlert } from "../../models/Error/AlertBoxes";
import { CreateUserReq, LoginReq } from "../../models/User";
import { toastNotify } from "../../Helper";
import { SubmitButton } from "../../components/Buttons";

YupPassword(Yup); // extend yup

const Register = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const data = new CreateUserReq();

  const submitForm = (values: CreateUserReq) => {
    setError("");
    setSuccess("");
    AuthApi.register(values)
      .then((res) => {
        setSuccess("Please check email and verify your account.");
        loginUser(new LoginReq(values.email ?? "", values.password ?? ""));
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
        toastNotify(errDetails?.Message || "Service failed.", "error");
      });
  };

  const loginUser = (values: LoginReq) => {
    AuthApi.login(values)
      .then((res) => {
        // let authRes: AuthenticationResponseDto = res;
        // console.log(authRes);
        localStorage.setItem("token", res.accessToken ?? "");
        localStorage.setItem("refreshToken", res.refreshToken ?? "");
        dispatch(setLoggedInUser(res));
        toastNotify("Account created successfully");
        navigate("/");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Login service failed.");
        console.log("Error: " + err?.response?.data?.Message);
      });
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    username: Yup.string()
      .required("Username is required.")
      .max(50, "Maximum 50 characters."),
    password: Yup.string()
      .required("Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
  });

  const showForm = () => (
    <Formik
      initialValues={data}
      onSubmit={(values) => {
        submitForm(values);
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, errors, touched }) => (
        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.username && touched.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Field as={Input} id="username" name="username" type="text" />
              <FormErrorMessage>{errors.username}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password && touched.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Field as={Input} id="password" name="password" type="password" />
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={!!errors.confirmPassword && touched.confirmPassword}
            >
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <Field
                as={Input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>
            <SubmitButton text="Create Account" />
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Stack minH={"50vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify={"center"}>
        <Stack spacing={4} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create New Account</Heading>
          {error && <ErrorAlert description={error} />}
          {success && <SuccessAlert description={success} />}
          {showForm()}
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={"Register Image"}
          objectFit={"cover"}
          src={
            "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80"
          }
        />
      </Flex>
    </Stack>
  );
};

export default Register;
