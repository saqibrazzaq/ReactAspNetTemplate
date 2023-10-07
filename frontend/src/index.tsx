import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./storage/Redux/store";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ChakraProvider } from "@chakra-ui/react";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <ToastContainer />
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);
