import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PendingManuals, {
  loader as getPendingManuals,
} from "./pages/PendingManuals";
import Home, { loader as getManuals } from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import AuthLogin, { action as login } from "./pages/AuthLogin";
import AuthSignup, { action as signup } from "./pages/AuthSignup";
import AuthError from "./pages/AuthError";
import { Unauthzeried } from "./pages/Unauthzeried";
import UserManuals, { loader as getYourManuals } from "./pages/UserManuals";
import UploadManuals, { action as addManual } from "./pages/UploadManuals";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <AuthLogin />,
    errorElement: <AuthError />,
    action: login,
    children: [
      { path: "/Login/attemp", element: <AuthLogin />, action: login },
    ],
  },
  {
    path: "/Signup",
    element: <AuthSignup />,
    errorElement: <AuthError />,
    action: signup,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/:name",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Home />,
        loader: getManuals,
      },
      {
        path: "/your-manuals",
        element: <UserManuals />,
        errorElement: <Unauthzeried />,
        loader: getYourManuals,
        children: [
          {
            path: "/your-manuals/upload",
            element: <UploadManuals />,
            action: addManual,
          },
        ],
      },
      {
        path: "pending-manuals",
        element: <PendingManuals />,
        loader: getPendingManuals,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
