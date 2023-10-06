import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Public from "../pages/Public";
import Private from "../pages/Private";
import Login from "../pages/Login";
import Refresh from "../pages/Refresh";
import Home from "../pages/Home/Home";
import AccountLayout from "../layout/AccountLayout/AccountLayout";
import AccountHome from "../pages/Account/AccountHome";
import ChangePassword from "../pages/Account/ChangePassword";
import AdminLayout from "../layout/AdminLayout/AdminLayout";

const Routes = () => {
  const { token } = useAuth();

  // Define public routes accessible to all users
  const routesForPublic = [
    {
      path: "/public",
      element: <Public />,
    },
    {
      path: "/private",
      element: <Private />,
    },
  ];

  // Define routes accessible only to authenticated users
  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <ProtectedRoute />, // Wrap the component in ProtectedRoute
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/account",
          element: <AccountLayout />,
          children: [
            {
              path: "",
              element: <AccountHome />
            },
            {
              path: "change-password",
              element: <ChangePassword />
            },
            {
              path: "logout",
              element: <Logout />
            }
          ]
        },
        {
          path: "/refresh",
          element: <Refresh />
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <AdminLayout />,
      children: [
        {
          path: "login",
          element: <Login/>,
        },
      ]
    },
    
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    // ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
