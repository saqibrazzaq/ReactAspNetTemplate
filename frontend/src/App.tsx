import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Footer, Header } from "./layout";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthApi } from "./api/AuthApi";
import { setLoggedInUser } from "./storage/Redux/userAuthSlice";
import { toastNotify } from "./Helper";
import { Home } from "./pages/Home";
import {
  AccessDenied,
  ForgotPassword,
  Login,
  Register,
  ResetPassword,
} from "./pages/Auth";
import { Private, Public } from "./pages/ZOther";
import { AccountLayout } from "./layout/AccountLayout";
import { AdminLayout } from "./layout/AdminLayout";
import { SuperAdminLayout } from "./layout/SuperAdminLayout";

function App() {
  const dispatch = useDispatch();
  // const userData = useSelector((state: RootState) => state.userAuthStore);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      AuthApi.userInfo()
        .then((res) => {
          // console.log("In App.tsx");
          // console.log(res);
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
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/public" element={<Public />} />
          <Route path="/private" element={<Private />} />
          <Route path="/account/*" element={<AccountLayout />} />
          <Route path="/admin/*" element={<AdminLayout />} />
          <Route path="/superadmin/*" element={<SuperAdminLayout />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
