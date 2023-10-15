import { IconButton, Tooltip } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import IconButtonProps from "./IconButtonProps";

const DeleteIconButton = ({
  size = "xs",
  fontSize = "16",
}: IconButtonProps) => {
  return (
    <Tooltip label="Delete">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="red"
        icon={<AiFillDelete />}
        aria-label="Delete"
      />
    </Tooltip>
  );
};

export default DeleteIconButton;
