import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import { FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";
import { MdOutlineVerifiedUser, MdPerson } from 'react-icons/md';
import { AiOutlineUnlock } from 'react-icons/ai';

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/account" },
  { name: "Change Password", icon: AiOutlineUnlock, href: "/account/change-password" },
  { name: "Verify Account", icon: MdOutlineVerifiedUser, href: "/account/verification-status"},
  { name: "Profile Picture", icon: MdPerson, href: "/account/profile-picture"}
];

const AccountLayout = () => {
  return (
    <Flex mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Account" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box flex="1">
        <Outlet />
      </Box>
    </Flex>
  )
}

export default AccountLayout