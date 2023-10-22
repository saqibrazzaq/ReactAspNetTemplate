import { Button } from "@chakra-ui/react";
import ButtonProps from "./ButtonProps";

const BackButton = ({
  text = "Back",
  size = "sm",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      size={size}
      disabled={disabled}
      colorScheme="gray"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default BackButton;
