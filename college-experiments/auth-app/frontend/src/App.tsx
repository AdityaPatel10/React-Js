import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { useState } from "react";
import RefreshHandler from "./utils/RefreshHandler";
import { PrivateRouteProps } from "./types/AuthTypes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const PrivateRoute = ({ element }: PrivateRouteProps) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </>
  );
}

export default App;
