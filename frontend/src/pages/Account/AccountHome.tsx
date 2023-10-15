import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AuthApi } from "../../api/AuthApi";
import AuthenticationResponseDto from "../../models/User/AuthenticationResponseDto";

const AccountHome = () => {
  const [userInfo, setUserInfo] = useState<AuthenticationResponseDto>();
  useEffect(() => {
    AuthApi.userInfo().then((res) => {
      setUserInfo(res);
    });
  }, []);
  return (
    <div>
      <Card maxW="md">
        <CardHeader>
          <Flex letterSpacing="4">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              {/* <Avatar name={userInfo?.userName} src={userInfo?.profilePictureUrl} /> */}

              <Box>
                <Heading size="sm">{userInfo?.userName}</Heading>
                <Text>{userInfo?.email}</Text>
                <div>
                  <Heading size={"sm"}>Roles: </Heading>
                  {userInfo?.roles?.map((item, index) => (
                    <Text key={index}>{item + ", "}</Text>
                  ))}
                </div>
              </Box>
            </Flex>
            {/* <IconButton
        variant='ghost'
        colorScheme='gray'
        aria-label='See menu'
        icon={<BsThreeDotsVertical />}
      /> */}
          </Flex>
        </CardHeader>
        <CardBody>
          <Text></Text>
        </CardBody>

        <CardFooter
          justify="space-between"
          flexWrap="wrap"
          sx={{
            "& > button": {
              minW: "136px",
            },
          }}
        >
          {/* <Button flex='1' variant='ghost' leftIcon={<BiLike />}>
      Like
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiChat />}>
      Comment
    </Button>
    <Button flex='1' variant='ghost' leftIcon={<BiShare />}>
      Share
    </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AccountHome;
