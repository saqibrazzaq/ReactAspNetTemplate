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
import {
  CountryEditReq,
  CountryRes,
  StateEditReq,
} from "../../../models/Country";
import { CountryApi, StateApi } from "../../../api";
import { toastNotify } from "../../../Helper";
import ErrorDetails from "../../../models/Error/ErrorDetails";

const StateEdit = () => {
  const params = useParams();
  const { stateId, countryId } = params;
  const updateText = stateId ? "Update State" : "Create State";
  const [state, setState] = useState<StateEditReq>(new StateEditReq(countryId));
  const navigate = useNavigate();

  useEffect(() => {
    loadState();
  }, []);

  const loadState = () => {
    if (!stateId) return;
    StateApi.get(stateId)
      .then((res) => {
        // console.log("country: " + res);
        setState(res);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    stateName: Yup.string().required(),
    stateCode: Yup.string().required(),
    countryId: Yup.string().required(),
  });

  const submitForm = (values: StateEditReq) => {
    // console.log(values);
    if (stateId) {
      updateState(values);
    } else {
      createState(values);
    }
  };

  const updateState = (values: StateEditReq) => {
    StateApi.update(stateId, values)
      .then((res) => {
        toastNotify("State updated successfully");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const createState = (values: StateEditReq) => {
    StateApi.create(values)
      .then((res) => {
        toastNotify("State created successfully");
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
        initialValues={state}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.stateCode && touched.stateCode}>
                <FormLabel fontSize={"sm"} htmlFor="stateCode">
                  State Code
                </FormLabel>
                <Field
                  as={Input}
                  id="countryId"
                  name="countryId"
                  type="hidden"
                />
                <Field
                  size={"sm"}
                  as={Input}
                  id="stateCode"
                  name="stateCode"
                  type="text"
                />
                <FormErrorMessage>{errors.stateCode}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.stateName && touched.stateName}>
                <FormLabel fontSize={"sm"} htmlFor="stateName">
                  State Name
                </FormLabel>
                <Field
                  size={"sm"}
                  as={Input}
                  id="stateName"
                  name="stateName"
                  type="text"
                />
                <FormErrorMessage>{errors.stateName}</FormErrorMessage>
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
          {updateText + " - " + state?.stateName}
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

export default StateEdit;
