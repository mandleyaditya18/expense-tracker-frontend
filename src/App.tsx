import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./components/hoc/ProtectedRoute";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <div>Root path</div>
      </ProtectedRoute>
    ),
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
