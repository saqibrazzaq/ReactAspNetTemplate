import { Button } from "@chakra-ui/react";
import ButtonProps from "./ButtonProps";

const SubmitButton = ({
  text = "Cancel",
  size = "sm",
  disabled = false,
  onClick,
}: ButtonProps) => {
  return (
    <Button
      type="submit"
      size={size}
      disabled={disabled}
      colorScheme="blue"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default SubmitButton;
