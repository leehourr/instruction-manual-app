import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashbord from "./pages/AdminDashbord";
import Home, { loader as getManuals } from "./pages/Home";
import Layout from "./pages/Layout";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";
import AuthLogin from "./pages/AuthLogin";
import AuthSignup from "./pages/AuthSignup";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <AuthLogin />,
  },
  {
    path: "/Signup",
    element: <AuthSignup />,
  },
  {
    path: "/:name",
    element: <Profile />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: getManuals,
      },
      {
        path: "/upload-manual",
        element: <Upload />,
      },
      {
        path: "pending-manuals",
        element: <AdminDashbord />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
