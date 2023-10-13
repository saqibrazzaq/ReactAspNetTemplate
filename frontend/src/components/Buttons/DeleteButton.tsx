import { Button } from '@chakra-ui/react';
import React from 'react'

interface DeleteButtonProps {
  text?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = (props) => {
  let text = "Submit";
  let disabled = false;

  if (props.text) text = props.text;
  if (props.disabled) disabled = props.disabled;


  return (
    <Button disabled={disabled} colorScheme="red" onClick={props.onClick}>
      {text}
    </Button>
  )
}

export default DeleteButton