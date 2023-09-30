import { Box, Container, Stack } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"max"}>
        Home
      </Stack>
    </Box>
  )
}

export default Home