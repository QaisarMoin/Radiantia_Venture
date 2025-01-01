
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("authToken"); // Token check
  const location = useLocation();

  if (!authToken) {
    // User login nahi hai, to login page par redirect karenge
    return <Navigate to={`/login?redirectTo=${location.pathname}`} replace />;
  }

  // User login hai, to protected route render karega
  return children;
};

export default ProtectedRoute;
