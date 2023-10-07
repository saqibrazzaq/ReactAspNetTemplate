import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  Avatar,
  MenuList,
  MenuItem,
  MenuDivider,
  Image,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import { Link as RouteLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Roles } from "../../models/User/Roles";
import Common from "../../utility/Common";
import AuthenticationResponseDto from "../../models/User/AuthenticationResponseDto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../storage/Redux/store";
import {
  setLoggedInUser,
  emptyUserState,
} from "../../storage/Redux/userAuthSlice";

interface NavItem {
  name: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  slug?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    name: "Admin",
    href: "/admin",
    children: [
      {
        name: "Register Admin",
        subLabel: "Create a new Admin user",
        href: "/admin/register-admin",
      },
      {
        name: "New & Noteworthy",
        subLabel: "Up-and-coming Designers",
        href: "#",
      },
    ],
  },
  {
    name: "Public",
    href: "/public",
  },
  {
    name: "Private",
    href: "/private",
  },
];

export default function Header() {
  const { isOpen, onToggle } = useDisclosure();
  const [navItems, setNavItems] = useState<Array<NavItem>>([]);
  const dispatch = useDispatch();
  const userData: AuthenticationResponseDto = useSelector(
    (state: RootState) => state.userAuthStore
  );
  const navigate = useNavigate();
  console.log("In header");
  console.log(userData);

  useEffect(() => {
    setNavItems(NAV_ITEMS);
  }, []);

  // const loadTaxonMenu = () => {
  //   axios
  //     .get("Taxons/search", {
  //       params: new SearchTaxonsRequestParams(
  //         "",
  //         10,
  //         false,
  //         "",
  //         1,
  //         5,
  //         "Position"
  //       ),
  //     })
  //     .then((res) => {
  //       // console.log(res.data.pagedList);
  //       setNavItems(res.data.pagedList);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  function isAdmin() {
    if (
      userData?.roles?.indexOf(Roles.SuperAdmin) ||
      userData?.roles?.indexOf(Roles.Admin) ||
      userData?.roles?.indexOf(Roles.Manager) ||
      userData?.roles?.indexOf(Roles.Owner)
    ) {
      return true;
    }

    return false;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  const showMenuForLoggedInUser = () => {
    console.log("In logged in menu: " + userData.email);
    return (
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={""} />
          </MenuButton>
          <MenuList>
            {userData?.roles?.length && isAdmin() ? (
              <MenuItem as={RouteLink} to="/admin">
                Admin
              </MenuItem>
            ) : (
              <></>
            )}

            <MenuItem as={RouteLink} to="/account">
              My Account
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    );
  };

  const showMenuForPublicUser = () => (
    <>
      <Button fontSize={"sm"} fontWeight={400} as={RouteLink} to="/login">
        Sign In
      </Button>
      <Button
        display={{ base: "none", md: "inline-flex" }}
        fontSize={"sm"}
        fontWeight={600}
        color={"white"}
        bg={"pink.400"}
        _hover={{
          bg: "pink.300",
        }}
        as={RouteLink}
        to="/register"
      >
        Sign Up
      </Button>
    </>
  );

  // const showSignInMenu = () => (
  //   <>{userData.email ? showMenuForLoggedInUser() : showMenuForPublicUser()}</>
  // );

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            <RouteLink to="/">
              <Image src="/amg-logo.jpg" width={"100px"} />
            </RouteLink>
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav NAV_ITEMS={navItems} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          {/* {showSignInMenu()} */}
          {userData.email && showMenuForLoggedInUser()}
          {!userData.email && showMenuForPublicUser()}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav NAV_ITEMS={navItems} />
      </Collapse>
    </Box>
  );
}

interface NavItemProps {
  NAV_ITEMS: Array<NavItem>;
}

const DesktopNav: React.FC<NavItemProps> = (props) => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {props.NAV_ITEMS.map((navItem) => (
        <Box key={navItem.name}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                as={RouteLink}
                to={navItem.href ?? "/category/" + navItem.slug}
                // href={navItem.href ?? "#"}
                fontSize={"sm"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.name}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.name} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ name: label, href, subLabel, slug }: NavItem) => {
  return (
    <Link
      as={RouteLink}
      to={slug ? "category/" + slug : "#"}
      // href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          {/* <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} /> */}
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav: React.FC<NavItemProps> = (props) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {props.NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.name} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ name: label, children, href, slug }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouteLink}
        to={slug ? "category/" + slug : "#"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.name}
                py={2}
                as={RouteLink}
                to={child.slug ? "category/" + child.slug : "#"}
              >
                {child.name}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
