import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Img,
  Input,
  Link,
  Spacer,
  Stack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import PagedResponse from "../../models/Others/PagedResponse";
import UserResponseDto from "../../models/User/UserResponseDto";
import SearchUsersRequestParameters from "../../models/User/SearchUsersRequestParameters";
import Common from "../../utility/Common";
import { UserApi } from "../../api/UserApi";
import toastNotify from "../../Helper/toastNotify";
import GrayButton from "../../components/Buttons/GrayButton";
import RegularButton from "../../components/Buttons/RegularButton";
import RoleIconButton from "../../components/Icons/RoleIconButton";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationResponseDto from "../../models/User/AuthenticationResponseDto";
import { RootState } from "../../storage/Redux/store";
import { Field, Formik } from "formik";
import AddRoleRequestDto from "../../models/User/AddRoleRequestDto";
import ErrorDetails from "../../models/Error/ErrorDetails";
import RoleDropdown from "../../components/Dropdowns/RoleDropdown";
import RoleRes from "../../models/User/RoleRes";
import SubmitButton from "../../components/Buttons/SubmitButton";
import DeleteIconButton from "../../components/Icons/DeleteIconButon";

const UserRoles = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserResponseDto>();
  const params = useParams();
  const { username } = params;
  const [roleData, setRoleData] = useState<AddRoleRequestDto>(
    new AddRoleRequestDto(username, "")
  );

  useEffect(() => {
    UserApi.getUserByName(username ?? "")
      .then((res) => setUserData(res))
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  }, []);

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>User Roles - {userData?.userName}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} onClick={() => navigate(-1)}>
          <GrayButton />
        </Link>
      </Box>
    </Flex>
  );

  const displayRoles = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Role</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {userData?.roles ? (
            userData?.roles.map((item, index) => (
              <Tr key={index}>
                <Td>{item}</Td>
                <Td>
                  <Link as={RouteLink} ms={2} to={item + "/delete"}>
                    <DeleteIconButton />
                  </Link>
                </Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );

  const submitForm = (values: AddRoleRequestDto) => {
    // console.log(values);
    UserApi.addRoleToUser(values)
      .then((res) => {
        toastNotify("Role added.");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "", "error");
      });
  };

  // Formik validation schema
  const validationSchema = Yup.object({
    userName: Yup.string().required(),
    roleName: Yup.string().required(),
  });

  const showUpdateForm = () => (
    <Box p={0}>
      <Formik
        initialValues={roleData}
        onSubmit={(values) => {
          submitForm(values);
        }}
        validationSchema={validationSchema}
        enableReinitialize={true}
      >
        {({ handleSubmit, errors, touched, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} as={Container} maxW={"3xl"}>
              <FormControl isInvalid={!!errors.userName && touched.userName}>
                {/* <FormLabel htmlFor="userName">User Name</FormLabel> */}
                <Field as={Input} id="userName" name="userName" type="hidden" />
                <FormErrorMessage>{errors.userName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.roleName && touched.roleName}>
                {/* <FormLabel htmlFor="roleName">Role Name</FormLabel> */}
                <Field as={Input} id="roleName" name="roleName" type="hidden" />
                <RoleDropdown
                  selectedRole={undefined}
                  handleChange={(value: RoleRes) => {
                    setFieldValue("roleName", value.roleName);
                  }}
                />

                <FormErrorMessage>{errors.roleName}</FormErrorMessage>
              </FormControl>

              <Stack spacing={6}>
                <SubmitButton text={"Add Role"} />
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
        {displayHeading()}
        {showUpdateForm()}
        {displayRoles()}
      </Stack>
    </Box>
  );
};

export default UserRoles;
