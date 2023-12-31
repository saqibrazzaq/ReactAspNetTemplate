import { Box, Center, Flex, Square, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import { FiCompass, FiHome, FiTrendingUp } from "react-icons/fi";
import LeftSideMenu, { LinkItemProps } from "./LeftSideMenu";
import { MdOutlineVerifiedUser, MdPerson } from "react-icons/md";
import { AiOutlineUnlock } from "react-icons/ai";
import {
  AdminHome,
  DeleteUser,
  UpdateUser,
  UserRoles,
  Users,
} from "../../pages/Admin";
import { NotFound } from "../../pages/ZOther";
import { withAdminAuth } from "../../hoc";

const LinkItems: Array<LinkItemProps> = [
  { name: "Home", icon: FiHome, href: "/admin" },
  {
    name: "Users",
    icon: AiOutlineUnlock,
    href: "/admin/users",
  },
  {
    name: "Admin 2",
    icon: MdOutlineVerifiedUser,
    href: "/admin/2",
  },
  { name: "Admin 3", icon: MdPerson, href: "/admin/3" },
];

const AdminLayout = () => {
  return (
    <Flex mt="2">
      <Box w="250px">
        <LeftSideMenu menuHeading="Admin" menuItems={LinkItems} />
      </Box>
      <Center bg="gray.300" w="1px"></Center>
      <Box flex="1">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/update" element={<UpdateUser />} />
          <Route path="/users/:username/delete" element={<DeleteUser />} />
          <Route path="/users/:username/roles" element={<UserRoles />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </Flex>
  );
};

export default withAdminAuth(AdminLayout);
