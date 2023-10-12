import { Button } from "@chakra-ui/react";
import React from "react";

interface SubmitButtonProps {
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  let text = "Submit";

  if (props.text) text = props.text;

  return (
    <Button type="submit" colorScheme="blue">
      {text}
    </Button>
  );
};

export default SubmitButton;
