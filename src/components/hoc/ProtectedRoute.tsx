import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const user = localStorage.getItem("token");

  useEffect(() => {
    if (!user || user === "undefined") {
      navigate("/login", { replace: true });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    }
  }, [navigate, user]);

  return children;
};

export default ProtectedRoute;
