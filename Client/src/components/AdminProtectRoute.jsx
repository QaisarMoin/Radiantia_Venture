import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const authToken = localStorage.getItem("adminToken"); // Token check
  const adminRole = localStorage.getItem("role"); // Role check
  const location = useLocation();

  

  if (!authToken || adminRole !== "admin") {
    // Agar user login nahi hai ya admin role nahi hai, toh admin login page par redirect karein
    return <Navigate to={`/RadiantiaAdminLoginPageDoaguru?redirectTo=${location.pathname}`} replace />;
  }

  // Agar user admin hai, toh protected route render karein
  return children;
};

export default AdminProtectedRoute;
