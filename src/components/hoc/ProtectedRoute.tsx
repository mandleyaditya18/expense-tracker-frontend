import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user === "undefined") {
      navigate("/login", { replace: true });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    } else if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, user, location]);

  return (
    <div className="flex h-dvh w-dvw">
      <Navbar />
      <div className="w-full h-full overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
