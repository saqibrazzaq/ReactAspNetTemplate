import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider >
      <ColorModeScript />
      <Routes />
      </ChakraProvider>
      
    </AuthProvider>
  );
}

export default App;
