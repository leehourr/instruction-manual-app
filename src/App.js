import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AdminDashbord from "./pages/AdminDashbord";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Upload from "./pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
        path: "/manuals",
        element: <Home />,
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
