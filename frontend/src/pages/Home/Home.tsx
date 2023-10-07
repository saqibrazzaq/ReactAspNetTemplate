import { Box, Container, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";

const Home = () => {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        <Text>Home page</Text>
      </Stack>
    </Box>
  );
};

export default Home;
