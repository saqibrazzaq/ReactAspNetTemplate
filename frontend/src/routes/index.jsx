import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Logout from "../pages/Logout";
import Public from "../pages/Public";
import Private from "../pages/Private";
import Login from "../pages/Login";

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
          element: <div>User Home Page</div>,
        },
        {
          path: "/profile",
          element: <div>User Profile</div>,
        },
        {
          path: "/logout",
          element: <Logout/>,
        },
      ],
    },
  ];

  // Define routes accessible only to non-authenticated users
  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <div>Home Page</div>,
    },
    {
      path: "/login",
      element: <Login/>,
    },
  ];

  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    ...routesForPublic,
    // ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForNotAuthenticatedOnly,
    ...routesForAuthenticatedOnly,
  ]);

  // Provide the router configuration using RouterProvider
  return <RouterProvider router={router} />;
};

export default Routes;
