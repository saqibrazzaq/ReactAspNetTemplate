import { IconButton, Tooltip } from "@chakra-ui/react";
import { FaMapMarkedAlt } from "react-icons/fa";
import IconButtonProps from "./IconButtonProps";

const StateIconButton = ({ size = "sm", fontSize = "18" }: IconButtonProps) => {
  return (
    <Tooltip label="States">
      <IconButton
        variant="outline"
        size={size}
        fontSize={fontSize}
        colorScheme="blue"
        icon={<FaMapMarkedAlt />}
        aria-label="States"
      />
    </Tooltip>
  );
};

export default StateIconButton;
