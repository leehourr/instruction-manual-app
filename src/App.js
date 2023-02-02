import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PendingManuals, {
  loader as getPendingManuals,
} from "./pages/PendingManuals";
import Home, { loader as getManuals } from "./pages/Home";
import Layout, { loader as getUser } from "./pages/Layout";
import Profile, { loader as userData } from "./pages/Profile";
import AuthSignup from "./pages/AuthSignup";
import UserManuals, { loader as getYourManuals } from "./pages/UserManuals";
import UploadManuals, { action as addManual } from "./pages/UploadManuals";
import Login from "./components/Auth/Login";
import AuthProvider from "./Context/AuthProvider";
import Users, { loader as getUserList } from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import { Unauthzeried } from "./pages/Unauthzeried";
import SearchManual, { loader as seacrhManual } from "./pages/SearchManual";
import EachManual, { loader as manual } from "./pages/EachManual";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
    // errorElement: <AuthError />,
    // action: login,
  },
  {
    path: "/Signup",
    element: <AuthSignup />,
    // errorElement: <AuthError />,
    // action: signup,
  },
  {
    path: "/",
    element: <Layout />,
    loader: getUser,
    children: [
      {
        path: "/:name",
        element: <Profile />,
        loader: userData,
      },
      {
        path: "/",
        element: <Home />,
        loader: getManuals,
      },
      {
        path: "/search/:seacrhManual",
        element: <SearchManual />,
        loader: seacrhManual,
      },
      {
        path: "/manuals/:manualName",
        element: <EachManual />,
        loader: manual,
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
      {
        path: "user-lists",
        element: <Users />,
        loader: getUserList,
      },
      {
        path: "/404",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
