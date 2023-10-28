import {
  Box,
  Button,
  Center,
  Container,
  Flex,
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
import React, { useEffect, useState } from "react";
import {
  Link as RouteLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { UserAddressRes } from "../../../models/User";
import { UserAddressApi } from "../../../api";
import { ErrorDetails } from "../../../models/Error";
import { toastNotify } from "../../../Helper";
import { BackButton, RegularButton } from "../../../components/Buttons";
import { DeleteIconButton, EditIconButton } from "../../../components/Icons";
import { AddressBlock } from "../../../components/Text";

const UserAddresses = () => {
  const location = useLocation();
  const [addresses, setAddresses] = useState<UserAddressRes[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    searchUserAddresses();
  }, []);

  const searchUserAddresses = () => {
    UserAddressApi.getAll()
      .then((res) => {
        //let userRes: PagedResponse<UserDto> = res;
        // console.log(res);
        setAddresses(res);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>User Addresses</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to={"edit"}>
          <RegularButton text="Create Address" />
        </Link>
        <Link ml={2} onClick={() => navigate(-1)}>
          <BackButton />
        </Link>
      </Box>
    </Flex>
  );

  const displayUserAddresses = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Address</Th>
            <Th>Primary</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {addresses.map((item, index) => (
            <Tr key={index}>
              <Td>
                <AddressBlock address={item.address} />
              </Td>
              <Td>{item.address?.isPrimary ? "Primary" : ""}</Td>
              <Td>
                <Link as={RouteLink} ms={2} to={item.userAddressId + "/edit"}>
                  <EditIconButton />
                </Link>
                <Link as={RouteLink} ms={2} to={item.userAddressId + "/delete"}>
                  <DeleteIconButton />
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayUserAddresses()}
      </Stack>
    </Box>
  );
};

export default UserAddresses;
