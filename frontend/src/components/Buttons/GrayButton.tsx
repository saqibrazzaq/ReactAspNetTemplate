import { Button } from '@chakra-ui/react'

interface GrayButtonProps {
  text?: string;
}

const GrayButton: React.FC<GrayButtonProps> = (props) => {
  const _text = props.text ?? "Back";
  return (
    <Button colorScheme="gray" >{_text}</Button>
  )
}

export default GrayButton