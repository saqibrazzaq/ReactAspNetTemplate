import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  useDisclosure,
} from "@chakra-ui/react";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { UserApi } from "../../api/UserApi";
import { Field, Formik } from "formik";
import { AddRoleReq, RemoveRoleReq, RoleRes, UserRes } from "../../models/User";
import ErrorDetails from "../../models/Error/ErrorDetails";
import { toastNotify } from "../../Helper";
import {
  CancelButton,
  DeleteButton,
  BackButton,
  SubmitButton,
} from "../../components/Buttons";
import { DeleteIconButton } from "../../components/Icons";
import { RoleDropdown } from "../../components/Dropdowns";

const UserRoles = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserRes>();
  const params = useParams();
  const { username } = params;
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [roleData, setRoleData] = useState<AddRoleReq>(
    new AddRoleReq(username, "")
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadUserRoles();
  }, []);

  const loadUserRoles = () => {
    UserApi.getUserByName(username ?? "")
      .then((res) => setUserData(res))
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>User Roles - {userData?.userName}</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link ml={2} onClick={() => navigate(-1)}>
          <BackButton />
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
                  <Link
                    ms={2}
                    onClick={() => {
                      onOpen();
                      setSelectedRole(item);
                    }}
                  >
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

  const submitForm = (values: AddRoleReq) => {
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

  const removeRole = () => {
    onClose();
    UserApi.removeRoleFromUser(new RemoveRoleReq(username, selectedRole))
      .then((res) => {
        toastNotify(selectedRole + " removed successfully.");
        loadUserRoles();
      })
      .catch((err) => {
        // console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Service failed", "error");
      });
  };

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Remove {selectedRole} Role from User
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <CancelButton />
            </Link>
            <Link onClick={removeRole} ml={3}>
              <DeleteButton text="Remove Role from User" />
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {showUpdateForm()}
        {displayRoles()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
};

export default UserRoles;
