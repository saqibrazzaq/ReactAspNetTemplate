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
import ChangePasswordRequestDto from "../../models/User/ChangePasswordRequestDto";
import Common from "../../utility/Common";
import { AuthApi } from "../../api/AuthApi";
import ErrorDetails from "../../models/Error/ErrorDetails";
import SubmitButton from "../../components/SubmitButton";

YupPassword(Yup); // extend yup

export default function ChangePassword(): JSX.Element {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  let pwdData = new ChangePasswordRequestDto();
  pwdData.currentPassword = "";
  pwdData.newPassword = "";
  pwdData.confirmNewPassword = "";
  pwdData.email = "Common.user?.email";

  // Formik validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
    currentPassword: Yup.string()
      .required("Current Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    newPassword: Yup.string()
      .required("New Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
    confirmNewPassword: Yup.string()
      .required("Confirm New Password is required.")
      .min(6, "Minimum 6 characters required.")
      .minUppercase(1, "At least one Upper Case letter required.")
      .minLowercase(1, "At least one lower case letter required.")
      .minNumbers(1, "At least one number required")
      .minSymbols(1, "At least one symbol required"),
  });

  const submitForm = (values: ChangePasswordRequestDto) => {
    setError("");
    setSuccess("");
    AuthApi.changePassword(values)
      .then((res) => {
        console.log("Password changed successfully.");
        setSuccess("Your password has been changed successfully");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        console.log("Error: " + err?.response?.data?.Message);
        setError(errDetails?.Message || "Login service failed.");
      });
  };

  return (
    <Box p={4}>
      <Formik
        initialValues={pwdData}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <Heading fontSize={"xl"}>Change Password</Heading>
              {error && (
                <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Login failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {success && (
                <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Password Changed</AlertTitle>
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}
              <FormControl isInvalid={!!errors.email && touched.email}>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <Field
                  disabled={true}
                  as={Input}
                  id="email"
                  name="email"
                  type="email"
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.currentPassword && touched.currentPassword}
              >
                <FormLabel htmlFor="currentPassword">
                  Current Password
                </FormLabel>
                <Field
                  as={Input}
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.currentPassword}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.newPassword && touched.newPassword}
              >
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Field
                  as={Input}
                  id="newPassword"
                  name="newPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.newPassword}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={
                  !!errors.confirmNewPassword && touched.confirmNewPassword
                }
              >
                <FormLabel htmlFor="confirmNewPassword">
                  Confirm New Password
                </FormLabel>
                <Field
                  as={Input}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  type="password"
                />
                <FormErrorMessage>{errors.confirmNewPassword}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <SubmitButton text="Change Password" />
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );
}
