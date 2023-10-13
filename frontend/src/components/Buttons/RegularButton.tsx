import { Button } from '@chakra-ui/react';
import React from 'react'

interface RegularButtonProps {
  text?: string;
  onClick?: () => void;
}

const RegularButton: React.FC<RegularButtonProps> = (props) => {
  const _text = props.text ?? "Button";

  return (
    <Button colorScheme="blue" onClick={props.onClick} >
      {_text}
    </Button>
  )
}

export default RegularButton