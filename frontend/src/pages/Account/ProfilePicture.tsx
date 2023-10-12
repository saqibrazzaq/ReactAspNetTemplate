import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import Common from "../../utility/Common";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../api/AuthApi";
import ErrorDetails from "../../models/Error/ErrorDetails";
import { UserApi } from "../../api/UserApi";
import toastNotify from "../../Helper/toastNotify";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { ErrorAlert } from "../../models/Error/AlertBoxes";
import { useDispatch } from "react-redux";
import { setLoggedInUser } from "../../storage/Redux/userAuthSlice";

const ProfilePicture = () => {
  const [error, setError] = useState("");
  const [image, setImage] = useState(Common.DEFAULT_PROFILE_PICTURE);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    loadUserInfo();
  }, [image]);

  const loadUserInfo = () => {
    setError("");
    AuthApi.userInfo()
      .then((res) => {
        console.log("Load user info");
        console.log(res);
        if (res.profilePictureUrl) {
          console.log("Profile picture set");
          setImage(res.profilePictureUrl ?? "");
          dispatch(setLoggedInUser(res));
        }
      })
      .catch((err) => {
        console.log(err);
        let errDetails: ErrorDetails = err?.response?.data;
        setError(errDetails?.Message || "Service failed.");
      });
  };

  const showImage = () => <Image boxSize="200px" src={image} />;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    UserApi.updateProfilePicture(fd)
      .then((res) => {
        // console.log(res.data);
        toastNotify("Profile picture updated successfully");
        loadUserInfo();
        acceptedFiles.splice(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const files = acceptedFiles.map((file) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  acceptedFiles.map((file) => {
    fd.append("File[]", file);
  });

  const showForm = () => (
    <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
      <FormControl>
        <div {...getRootProps({ className: "dropzone" })}>
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </FormControl>
      <Stack spacing={6}>
        <SubmitButton text="Upload Profile Picture" />
      </Stack>
    </form>
  );

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"}>
        <Heading fontSize={"xl"}>User Profile Picture</Heading>
        {error && <ErrorAlert description={error} />}
        {image && showImage()}
        {showForm()}
      </Stack>
    </Box>
  );
};

export default ProfilePicture;
