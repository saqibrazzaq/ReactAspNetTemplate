import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Img,
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
import { Link as RouteLink, useNavigate } from "react-router-dom";
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
import ErrorDetails from "../../models/Error/ErrorDetails";
import DeleteIconButton from "../../components/Icons/DeleteIconButon";

const Users = () => {
  const [pagedRes, setPagedRes] = useState<PagedResponse<UserResponseDto>>();
  const navigate = useNavigate();

  useEffect(() => {
    searchUsers(
      new SearchUsersRequestParameters("", 1, Common.DEFAULT_PAGE_SIZE, "")
    );
  }, []);

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      let searchParams = new SearchUsersRequestParameters(
        "",
        previousPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchUsers(searchParams);
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      let searchParams = new SearchUsersRequestParameters(
        "",
        nextPageNumber,
        Common.DEFAULT_PAGE_SIZE,
        ""
      );

      searchUsers(searchParams);
    }
  };

  const searchUsers = (searchParams: SearchUsersRequestParameters) => {
    UserApi.search(searchParams)
      .then((res) => {
        //let userRes: PagedResponse<UserDto> = res;
        // console.log(res);
        setPagedRes(res);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Search Users</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to={"update"}>
          <RegularButton text="Create User" />
        </Link>
        <Link ml={2} onClick={() => navigate(-1)}>
          <GrayButton />
        </Link>
      </Box>
    </Flex>
  );

  const displayUsers = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th></Th>
            <Th>Username</Th>
            <Th>Email</Th>
            <Th>Roles</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList ? (
            pagedRes.pagedList.map((item) => (
              <Tr key={item.email}>
                <Td>
                  <Img src={item.profilePictureUrl} height={8} />
                </Td>
                <Td>{item.userName}</Td>
                <Td>{item.email}</Td>
                <Td>
                  {item.roles?.map((role, index) => (
                    <Text key={index}>{role + ", "}</Text>
                  ))}
                </Td>
                <Td>
                  <Link as={RouteLink} to={item.userName + "/roles"}>
                    <RoleIconButton />
                  </Link>
                  <Link as={RouteLink} ms={2} to={item.userName + "/delete"}>
                    <DeleteIconButton />
                  </Link>
                </Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th colSpan={3} textAlign="center">
              <Button
                isDisabled={!pagedRes?.metaData?.hasPrevious}
                variant="link"
                mr={5}
                onClick={previousPage}
              >
                Previous
              </Button>
              Page {pagedRes?.metaData?.currentPage} of{" "}
              {pagedRes?.metaData?.totalPages}
              <Button
                isDisabled={!pagedRes?.metaData?.hasNext}
                variant="link"
                ml={5}
                onClick={nextPage}
              >
                Next
              </Button>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        {displayHeading()}
        {displayUsers()}
      </Stack>
    </Box>
  );
};

export default Users;
