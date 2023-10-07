import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Footer, Header } from "./layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login";
import Public from "./pages/Public";
import Private from "./pages/Private";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./storage/Redux/store";
import { useEffect } from "react";
import { AuthApi } from "./api/AuthApi";
import { setLoggedInUser } from "./storage/Redux/userAuthSlice";
import toastNotify from "./Helper/toastNotify";

function App() {
  const dispatch = useDispatch();
  // const userData = useSelector((state: RootState) => state.userAuthStore);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      AuthApi.userInfo()
        .then((res) => {
          console.log("In App.tsx");
          console.log(res);
          dispatch(setLoggedInUser(res));
        })
        .catch((error) => toastNotify(error.Message));
    }
  }, []);
  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/public" element={<Public />} />
          <Route path="/private" element={<Private />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
