import { Box, ChakraProvider, Grid, theme } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import TopNavbar from './top-navbar'
import Footer from './Footer'

const PublicLayout = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box >
        <Grid minH="70vh" p={3}>
          <TopNavbar />
          <Outlet />
          <Footer />
        </Grid>
      </Box>
    </ChakraProvider>
  )
}

export default PublicLayout