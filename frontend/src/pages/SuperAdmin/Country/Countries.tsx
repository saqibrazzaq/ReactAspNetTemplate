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
import {
  Link as RouteLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { PagedResponse } from "../../../models/Request";
import { Common } from "../../../utility";
import { CountryRes } from "../../../models/Country";
import { CountryApi } from "../../../api/CountryApi";
import ErrorDetails from "../../../models/Error/ErrorDetails";
import { toastNotify } from "../../../Helper";
import { GrayButton, RegularButton } from "../../../components/Buttons";
import StateIconButton from "../../../components/Icons/StateIconButton";
import { DeleteIconButton } from "../../../components/Icons";

const Countries = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams(location.search);
  searchParams.set("pageSize", Common.DEFAULT_PAGE_SIZE.toString());

  const [pagedRes, setPagedRes] = useState<PagedResponse<CountryRes>>();
  const navigate = useNavigate();

  useEffect(() => {
    searchCountries();
  }, []);

  const updateSearchParams = (key: string, value: string) => {
    searchParams.set(key, value);
    setSearchParams(searchParams);
  };

  const previousPage = () => {
    if (pagedRes?.metaData) {
      let previousPageNumber = (pagedRes?.metaData?.currentPage || 2) - 1;
      updateSearchParams("pageNumber", previousPageNumber.toString());
    }
  };

  const nextPage = () => {
    if (pagedRes?.metaData) {
      let nextPageNumber = (pagedRes?.metaData?.currentPage || 0) + 1;
      updateSearchParams("pageNumber", nextPageNumber.toString());
    }
  };

  const searchCountries = () => {
    CountryApi.search(Object.fromEntries(searchParams))
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
        <Heading fontSize={"xl"}>Search Countries</Heading>
      </Box>
      <Spacer />
      <Box>
        <Link as={RouteLink} to={"update"}>
          <RegularButton text="Create Country" />
        </Link>
        <Link ml={2} onClick={() => navigate(-1)}>
          <GrayButton />
        </Link>
      </Box>
    </Flex>
  );

  const displayCountries = () => (
    <TableContainer>
      <Table variant="simple" size={"sm"}>
        <Thead>
          <Tr>
            <Th>Code</Th>
            <Th>Name</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          {pagedRes?.pagedList ? (
            pagedRes.pagedList.map((item) => (
              <Tr key={item.countryId}>
                <Td>{item.countryCode}</Td>
                <Td>{item.countryName}</Td>
                <Td>
                  <Link as={RouteLink} to={item.countryId + "/states"}>
                    <StateIconButton />
                  </Link>
                  <Link as={RouteLink} ms={2} to={item.countryId + "/delete"}>
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
        {displayCountries()}
      </Stack>
    </Box>
  );
};

export default Countries;
