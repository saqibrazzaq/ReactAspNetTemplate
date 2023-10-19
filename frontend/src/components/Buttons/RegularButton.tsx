import { Button } from "@chakra-ui/react";
import ButtonProps from "./ButtonProps";

const RegularButton = ({
  text = "Cancel",
  size = "sm",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      size={size}
      disabled={disabled}
      colorScheme="blue"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default RegularButton;
