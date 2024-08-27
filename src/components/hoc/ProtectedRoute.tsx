import { useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user === "undefined") {
      navigate("/login", { replace: true });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    }
  }, [navigate, user]);

  return (
    <div className="flex h-dvh w-dvw bg-[#1f1f1f]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
