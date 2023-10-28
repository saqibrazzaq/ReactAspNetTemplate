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
  Heading,
  HStack,
  Link,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams, Link as RouteLink, useNavigate } from "react-router-dom";
import { CountryWithStateCountRes } from "../../../models/Country";
import { CountryApi } from "../../../api";
import ErrorDetails from "../../../models/Error/ErrorDetails";
import { toastNotify } from "../../../Helper";

const UserAddressDelete = () => {
  let params = useParams();
  const { countryId } = params;
  const [country, setCountry] = useState<CountryWithStateCountRes>();
  const navigate = useNavigate();
  const toast = useToast();
  const [error, setError] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    loadCountry();
  }, [countryId]);

  const loadCountry = () => {
    if (!countryId) return;
    CountryApi.getWithStateCount(countryId)
      .then((res) => {
        setCountry(res);
        // console.log(res);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const deleteCountry = () => {
    setError("");
    CountryApi.delete(countryId)
      .then((res) => {
        toastNotify(country?.countryName + " deleted successfully.");
        navigate(-1);
      })
      .catch((err) => {
        let errDetails: ErrorDetails = err?.response?.data;
        toastNotify(errDetails?.Message ?? "Error", "error");
      });
  };

  const displayHeading = () => (
    <Flex>
      <Box>
        <Heading fontSize={"xl"}>Delete Country</Heading>
      </Box>
      <Spacer />
      <Box>
        <Button type="button" colorScheme={"gray"} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>
    </Flex>
  );

  const showCountryInfo = () => (
    <div>
      <Text fontSize="xl">
        Are you sure you want to delete the following Country?
      </Text>
      <TableContainer>
        <Table variant="simple">
          <Tbody>
            <Tr>
              <Th>Name</Th>
              <Td>{country?.countryName}</Td>
            </Tr>
            <Tr>
              <Th>Country Code</Th>
              <Td>{country?.countryCode}</Td>
            </Tr>
            <Tr>
              <Th>States</Th>
              <Td>{country?.stateCount}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
      <HStack pt={4} spacing={4}>
        <Button onClick={onOpen} type="button" colorScheme={"red"}>
          YES, I WANT TO DELETE THIS COUNTRY
        </Button>
      </HStack>
    </div>
  );

  const showAlertDialog = () => (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Country
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Link ref={cancelRef} onClick={onClose}>
              <Button type="button" colorScheme={"gray"}>
                Cancel
              </Button>
            </Link>
            <Link onClick={deleteCountry} ml={3}>
              <Button type="submit" colorScheme={"red"}>
                Delete Country Name
              </Button>
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
        {showCountryInfo()}
        {showAlertDialog()}
      </Stack>
    </Box>
  );
};

export default UserAddressDelete;
