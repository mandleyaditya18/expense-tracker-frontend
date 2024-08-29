import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/hoc/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Expenses from "./pages/Expenses";
import api from "./utils/api";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <h1 className="text-custom-white">Dashboard</h1>,
      },
      {
        path: "/expenses",
        element: <Expenses />,
        loader: async () => {
          const response = await api.get("/expenses/");
          return response.data;
        },
      },
      {
        path: "/settings",
        element: <h1 className="text-custom-white">Settings</h1>,
      },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
