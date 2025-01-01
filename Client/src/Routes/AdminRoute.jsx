import { Route, Routes } from "react-router-dom";
import { AdminDashBoard } from "../components/Admin/DashBoard";
import AdminLogin from "../components/Admin/AdminLoginPage";
import AdminProtectedRoute from "../components/AdminProtectRoute";
import { AlluserPage } from "../pages/Admin/AllUserPage";

export const AdminRoute = () => {
  return (
    <>
      <Routes>
        
          <Route path="/RadiantiaAdminLoginPageDoaguru" element={<AdminLogin/>} />

          <Route path="/RadiantiaAdminPanelDoaguru" element={<AdminProtectedRoute> <AdminDashBoard/>  </AdminProtectedRoute>}/>
          <Route path="/RadiantiaAdmin-All-Users" element={<AdminProtectedRoute> <AlluserPage/>  </AdminProtectedRoute>}/>

        
      </Routes>
    </>
  );
};