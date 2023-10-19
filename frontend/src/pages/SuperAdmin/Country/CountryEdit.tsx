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
import { CountryEditReq, CountryRes } from "../../../models/Country";
import { CountryApi } from "../../../api/CountryApi";
import { toastNotify } from "../../../Helper";
import ErrorDetails from "../../../models/Error/ErrorDetails";

const CountryEdit = () => {
  const params = useParams();
  const countryId = params.countryId;
  const updateText = countryId ? "Update Country" : "Create Country";
  const [country, setCountry] = useState<CountryEditReq>(new CountryEditReq());
  const navigate = useNavigate();

  useEffect(() => {
    loadCountry();
  }, []);

  const loadCountry = () => {
    if (!countryId) return;
    CountryApi.get(countryId)
      .then((res) => {
        // console.log("country: " + res);
        setCountry(res);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    countryName: Yup.string().required(),
    countryCode: Yup.string().required(),
  });

  const submitForm = (values: CountryEditReq) => {
    console.log(values);
    if (countryId) {
      updateCountry(values);
    } else {
      createCountry(values);
    }
  };

  const updateCountry = (values: CountryEditReq) => {
    CountryApi.update(countryId, values)
      .then((res) => {
        toastNotify("Country updated successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const createCountry = (values: CountryEditReq) => {
    CountryApi.create(values)
      .then((res) => {
        toastNotify("Country created successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={country}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl
                isInvalid={!!errors.countryCode && touched.countryCode}
              >
                <FormLabel fontSize={"sm"} htmlFor="countryCode">
                  Country Code
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="countryCode"
                  name="countryCode"
                  type="text"
                />
                <FormErrorMessage>{errors.countryCode}</FormErrorMessage>
              </FormControl>
              <FormControl
                isInvalid={!!errors.countryName && touched.countryName}
              >
                <FormLabel fontSize={"sm"} htmlFor="countryName">
                  Country Name
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="countryName"
                  name="countryName"
                  type="text"
                />
                <FormErrorMessage>{errors.countryName}</FormErrorMessage>
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
        <Heading fontSize={"lg"}>
          {updateText + " - " + country?.countryName}
        </Heading>
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

export default CountryEdit;
