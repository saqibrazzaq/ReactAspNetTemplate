import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Field, Formik } from "formik";
import CreateUserRequestDto from "../../models/User/CreateUserRequestDto";
import { UserApi } from "../../api/UserApi";
import toastNotify from "../../Helper/toastNotify";
import ErrorDetails from "../../models/Error/ErrorDetails";
import SubmitButton from "../../components/Buttons/SubmitButton";

YupPassword(Yup); // extend yup

const UpdateUser = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  let data = new CreateUserRequestDto();
  data.username = "saqib1";
  data.email = "saq.ibrazzaq@gmail.com";
  data.password = "Saqib123!";
  data.confirmPassword = "Saqib123!";
  data.fullName = "Saqib Razzaq";

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    username: Yup.string()
      .required("Username is required.")
      .max(50, "Maximum 50 characters."),
    fullName: Yup.string().required("Full Name is required."),
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

  const submitForm = (values: CreateUserRequestDto) => {
    setError("");
    setSuccess("");
    console.log(values);
    UserApi.createUser(values)
      .then((res) => {
        // console.log("New Admin user created successfully.");
        setSuccess("User created successfully.");
        toastNotify("User created successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        // console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "User service failed.");
        toastNotify(errDetails?.Message || "User service failed.", "error");
      });
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <Heading fontSize={"xl"}>Create User</Heading>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Create user failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>User created</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
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
              <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                <FormLabel htmlFor="fullName">Full Name</FormLabel>
                <Field as={Input} id="fullName" name="fullName" type="text" />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
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
              <FormControl
                isInvalid={!!errors.confirmPassword && touched.confirmPassword}
              >
                <FormLabel htmlFor="confirmPassword">
                  Confirm Password
                </FormLabel>
                <Field
                  as={Input}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <SubmitButton text="Create User" />
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default UpdateUser;
