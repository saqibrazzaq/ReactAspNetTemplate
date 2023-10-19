import { IconButton, Tooltip } from "@chakra-ui/react";
import { AiFillEdit } from "react-icons/ai";
import IconButtonProps from "./IconButtonProps";

const EditIconButton = ({ size = "xs", fontSize = "16" }: IconButtonProps) => {
  return (
    <Tooltip label="Edit">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="blue"
        icon={<AiFillEdit />}
        aria-label="Edit"
      />
    </Tooltip>
  );
};

export default EditIconButton;
