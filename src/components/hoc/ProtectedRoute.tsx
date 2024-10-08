import { useEffect } from "react";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import api from "@/utils/api";
import { useExpenseStore } from "@/store/useExpenseStore";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setExpenseCategories } = useExpenseStore();
  const user = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const response = await api.get("/expenses/categories");
      const data = await response.data;
      setExpenseCategories(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!user || user === "undefined") {
      navigate("/login", { replace: true });
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    } else if (location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, user, location]);

  useEffect(() => {
    if (user) {
      fetchCategories();
    }
  }, [user]);

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
