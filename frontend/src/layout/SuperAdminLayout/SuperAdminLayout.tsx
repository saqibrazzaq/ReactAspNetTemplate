import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";
import { MdOutlineVerifiedUser, MdPerson } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import { SuperAdminHome } from "../../pages/SuperAdmin";
import { NotFound } from "../../pages/ZOther";
import { withSuperAdminAuth } from "../../hoc";

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/superadmin" },
  {
    name: "SuperAdmin 1",
    icon: AiOutlineUnlock,
    href: "/superadmin/1",
  },
  {
    name: "SuperAdmin 2",
    icon: MdOutlineVerifiedUser,
    href: "/superadmin/2",
  },
  { name: "SuperAdmin 3", icon: MdPerson, href: "/superadmin/3" },
];

const SuperAdminLayout = () => {
  return (
    <Flex mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Admin" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box flex="1">
        <Routes>
          <Route path="/" element={<SuperAdminHome />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default withSuperAdminAuth(SuperAdminLayout);
