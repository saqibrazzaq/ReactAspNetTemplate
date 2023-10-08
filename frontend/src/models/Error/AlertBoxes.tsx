import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

interface AlertMessageProps {
  title?: string;
  description?: string;
}

const SuccessAlert: React.FC<AlertMessageProps> = (props) => {
  return (
    <Alert status="success">
      <AlertIcon />
      <AlertTitle>{props.title ?? "Success"}</AlertTitle>
      <AlertDescription>
        {props.description ?? "Success message description"}
      </AlertDescription>
    </Alert>
  );
};

const ErrorAlert: React.FC<AlertMessageProps> = (props) => {
  if (props.description?.toLowerCase() == "invalid token") {
    return <></>;
  } else {
    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{props.title ?? "Error"}</AlertTitle>
        <AlertDescription>
          {props.description ?? "Error message description"}
        </AlertDescription>
      </Alert>
    );
  }
};

export { ErrorAlert, SuccessAlert };
