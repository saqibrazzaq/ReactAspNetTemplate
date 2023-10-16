import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../api/AuthApi";
import { ErrorAlert, SuccessAlert } from "../../models/Error/AlertBoxes";
import { SendForgotPasswordEmailReq } from "../../models/User";
import { toastNotify } from "../../Helper";
import ErrorDetails from "../../models/Error/ErrorDetails";
import { SubmitButton } from "../../components/Buttons";

const ForgotPassword = () => {
  let data = new SendForgotPasswordEmailReq("saqibrazzaq@gmail.com");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toast = useToast();
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email address"),
  });

  const submitForm = (values: SendForgotPasswordEmailReq) => {
    setError("");
    setSuccess("");
    AuthApi.sendForgotPasswordEmail(values)
      .then((res) => {
        setSuccess("Please check email for password reset token.");
        toastNotify("Email sent. Please check email to reset your password.");
        navigate("/reset-password");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

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
            <FormControl isInvalid={!!errors.email && touched.email}>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Field as={Input} id="email" name="email" type="email" />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>

            <SubmitButton text="Request Password Reset" />
          </Stack>
        </form>
      )}
    </Formik>
  );

  return (
    <Box p={4} justifySelf="center">
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"2xl"}>Forgot Password</Heading>
        <Text fontSize={"lg"}>You will get an email with pin code.</Text>
        {error && <ErrorAlert description={error} />}
        {success && <SuccessAlert description={success} />}
        {showForm()}
      </Stack>
    </Box>
  );
};

export default ForgotPassword;
