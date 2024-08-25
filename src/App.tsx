import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  { path: "/", element: <div>Root path</div> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <SignUp /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
