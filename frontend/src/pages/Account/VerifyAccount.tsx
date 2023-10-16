import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Icon,
  Input,
  PinInput,
  PinInputField,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsCheckCircle } from "react-icons/bs";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import AuthenticationRes from "../../models/User/AuthenticationRes";
import VerifyEmailReq from "../../models/User/VerifyEmailReq";
import { UserApi } from "../../api/UserApi";
import { AuthApi } from "../../api/AuthApi";
import { ErrorAlert, SuccessAlert } from "../../models/Error/AlertBoxes";
import { toastNotify } from "../../Helper";
import ErrorDetails from "../../models/Error/ErrorDetails";

const VerifyAccount = () => {
  const [user, setUser] = useState<AuthenticationRes>();
  const [sendEmailerror, setSendEmailError] = useState("");
  const [sendEmailSuccess, setSendEmailSuccess] = useState("");
  const [verifyEmailError, setVerifyEmailError] = useState("");
  const [verifyEmailSuccess, setVerifyEmailSuccess] = useState("");
  const [pinCodeValue, setPinCodeValue] = useState("");

  let data = new VerifyEmailReq("");

  const navigate = useNavigate();

  // Formik validation schema
  const validationSchema = Yup.object({
    // pinCode: Yup.number()
    //   .required("Pin code is required")
    //   .min(1000, "4 digit pin code required")
    //   .max(9999, "4 digit pin code required"),
  });

  const submitForm = (values: VerifyEmailReq) => {
    verifyEmail(values);
  };

  const verifyEmail = (values: VerifyEmailReq) => {
    setVerifyEmailError("");
    setVerifyEmailSuccess("");
    data.pinCode = pinCodeValue;
    // console.log(data);
    UserApi.verifyEmail(data)
      .then((res) => {
        // console.log("Email verified successfully.");
        setVerifyEmailSuccess("Email verfied successfully.");
        setSendEmailSuccess("");
        toastNotify("Email verified successfully");
        // navigate("/account/verification-status");
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        // console.error("Error: " + err);
        setVerifyEmailError(errDetails?.Message || "Service failed.");
        toastNotify(errDetails.Message || "Service failed", "error");
      });
  };

  useEffect(() => {
    loadUserInfo();
  }, [verifyEmailSuccess]);

  const loadUserInfo = () => {
    setSendEmailError("Account is not verified.");
    AuthApi.userInfo()
      .then((res) => {
        // console.log("Load user info");
        // console.log(res);
        setUser(res);
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setSendEmailError(errDetails?.Message || "Service failed.");
      });
  };

  const sendVerificationEmail = () => {
    setSendEmailError("");
    setVerifyEmailError("");
    setSendEmailSuccess("");
    UserApi.sendVerificationEmail()
      .then((res) => {
        // console.log(res);
        setSendEmailSuccess(res);
        toastNotify(res);
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setSendEmailError(errDetails?.Message || "Service failed.");
        toastNotify(errDetails?.Message || "Service failed.", "error");
      });
  };

  const showAccountVerifiedError = () => (
    <Box>
      <ErrorAlert
        title="Account Verification Status:"
        description={sendEmailerror}
      />

      <Button onClick={sendVerificationEmail} colorScheme="blue" mt={4}>
        Send Verification Email
      </Button>
    </Box>
  );

  const showPinCodeForm = () => (
    <Box p={0}>
      <Formik
        initialValues={data}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, errors, touched }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={9} as={Container} maxW={"3xl"}>
              {verifyEmailError && (
                <ErrorAlert description={verifyEmailError} />
              )}
              {verifyEmailSuccess && (
                <SuccessAlert description={verifyEmailSuccess} />
              )}
              <FormControl isInvalid={!!errors.pinCode && touched.pinCode}>
                <FormLabel htmlFor="pinCode">
                  Email sent, Enter Pin Code
                </FormLabel>
                <HStack>
                  <PinInput onChange={(e) => setPinCodeValue(e)}>
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                    <PinInputField />
                  </PinInput>
                </HStack>
                <FormErrorMessage>{errors.pinCode}</FormErrorMessage>
              </FormControl>
              <Stack spacing={6}>
                <Button type="submit" colorScheme="blue">
                  Verify Pin Code
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"xl"}>Verify Account</Heading>
        {user?.emailConfirmed ? (
          <SuccessAlert description={"Account verified"} />
        ) : (
          showAccountVerifiedError()
        )}

        {sendEmailSuccess && showPinCodeForm()}
      </Stack>
    </Box>
  );
};

export default VerifyAccount;
