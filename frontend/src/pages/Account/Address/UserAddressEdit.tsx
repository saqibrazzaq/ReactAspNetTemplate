import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Field, Formik } from "formik";
import { toastNotify } from "../../../Helper";
import { UserAddressEditReq } from "../../../models/User";
import { UserAddressApi } from "../../../api";
import { ErrorDetails } from "../../../models/Error";
import { AddressEditReq } from "../../../models/Address";
import { StateRes } from "../../../models/Country";
import { StateDropdown } from "../../../components/Dropdowns";

const UserAddressEdit = () => {
  const params = useParams();
  const userAddressId = params.userAddressId;
  const updateText = userAddressId ? "Update Address" : "Create Address";
  const [userAddress, setUserAddress] = useState<AddressEditReq>(
    new AddressEditReq()
  );
  const [state, setState] = useState<StateRes>();
  const navigate = useNavigate();

  useEffect(() => {
    loadUserAddress();
  }, []);

  const loadUserAddress = () => {
    if (!userAddressId) return;
    UserAddressApi.get(userAddressId)
      .then((res) => {
        // console.log(res);
        setUserAddress(res.address);
        setState(res.address.state);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    fullName: Yup.string().required(),
    phone: Yup.string().required(),
    address1: Yup.string().required(),
    address2: Yup.string(),
    city: Yup.string(),
    stateId: Yup.string(),
  });

  const submitForm = (values: AddressEditReq) => {
    values = convertEmptyStringToNull(values);
    // console.log(values);
    if (userAddressId) {
      updateUserAddress(values);
    } else {
      createUserAddress(values);
    }
  };

  const updateUserAddress = (values: AddressEditReq) => {
    UserAddressApi.update(userAddressId, values)
      .then((res) => {
        toastNotify("Address updated successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const createUserAddress = (values: AddressEditReq) => {
    UserAddressApi.create(values)
      .then((res) => {
        toastNotify("Address created successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const convertNullToEmptyString = (obj: AddressEditReq) => {
    obj.stateId ??= "";
    return obj;
  };

  const convertEmptyStringToNull = (obj: AddressEditReq) => {
    obj.stateId = obj.stateId == "" ? undefined : obj.stateId;
    return obj;
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={convertNullToEmptyString(userAddress)}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.isPrimary && touched.isPrimary}>
                <label>
                  <Field id="isPrimary" name="isPrimary" type="checkbox" /> Is
                  Primary Address?
                </label>
                <FormErrorMessage>{errors.isPrimary}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.fullName && touched.fullName}>
                <FormLabel fontSize={"sm"} htmlFor="fullName">
                  Full Name
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="fullName"
                  name="fullName"
                  type="text"
                />
                <FormErrorMessage>{errors.fullName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.phone && touched.phone}>
                <FormLabel fontSize={"sm"} htmlFor="phone">
                  Phone
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="phone"
                  name="phone"
                  type="text"
                />
                <FormErrorMessage>{errors.phone}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address1 && touched.address1}>
                <FormLabel fontSize={"sm"} htmlFor="address1">
                  Address 1
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="address1"
                  name="address1"
                  type="text"
                />
                <FormErrorMessage>{errors.address1}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.address2 && touched.address2}>
                <FormLabel fontSize={"sm"} htmlFor="address2">
                  Address 2
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="address2"
                  name="address2"
                  type="text"
                />
                <FormErrorMessage>{errors.address2}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.city && touched.city}>
                <FormLabel fontSize={"sm"} htmlFor="city">
                  City
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="city"
                  name="city"
                  type="text"
                />
                <FormErrorMessage>{errors.city}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.stateId && touched.stateId}>
                <FormLabel htmlFor="stateId">State</FormLabel>
                <Field as={Input} id="stateId" name="stateId" type="hidden" />
                <FormErrorMessage>{errors.stateId}</FormErrorMessage>

                <StateDropdown
                  selectedState={state}
                  handleChange={(newValue?: StateRes) => {
                    setFieldValue("stateId", newValue?.stateId ?? "");
                    setState(newValue);
                  }}
                ></StateDropdown>
              </FormControl>
              <Stack direction={"row"} spacing={6}>
                <Button size={"sm"} type="submit" colorScheme={"blue"}>
                  {updateText}
                </Button>
              </Stack>
            </Stack>
          </form>
        )}
      </Formik>
    </Box>
  );

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"lg"}>{updateText}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button
          size={"sm"}
          type="button"
          colorScheme={"gray"}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Box>
    </Flex>
  );

  return (
    <Box width={"lg"} p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {showUpdateForm()}
      </Stack>
    </Box>
  );
};

export default UserAddressEdit;
