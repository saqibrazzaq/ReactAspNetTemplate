import { Button } from "@chakra-ui/react";
import React from "react";
import ButtonProps from "./ButtonProps";

const DeleteButton = ({
  text = "DELETE",
  size = "sm",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Button size={size} disabled={disabled} colorScheme="red" onClick={onClick}>
      {text}
    </Button>
  );
};

export default DeleteButton;
