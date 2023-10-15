import { IconButton, Tooltip } from "@chakra-ui/react";
import React from "react";
import { BsFillLockFill } from "react-icons/bs";
import IconButtonProps from "./IconButtonProps";

const RoleIconButton = ({ size = "xs", fontSize = "16" }: IconButtonProps) => {
  return (
    <Tooltip label="Role">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="dark"
        icon={<BsFillLockFill />}
        aria-label="Role"
      />
    </Tooltip>
  );
};

export default RoleIconButton;
