import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { RefreshHandlerProps } from "../types/AuthTypes";
const RefreshHandler = ({ setIsAuthenticated }: RefreshHandlerProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsAuthenticated(true);
      if (
        location.pathname === "/" ||
        location.pathname === "/login" ||
        location.pathname === "/register"
      ) {
        navigate("/home", { replace: false });
      }
    }
  }, [location, navigate, setIsAuthenticated]);
  return null;
};

export default RefreshHandler;
