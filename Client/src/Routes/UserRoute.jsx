import { Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/profile";
import LoginPage from "../pages/login";
import ProtectedRoute from "../components/ProtectedRoute";

export const UserRoute = () => {
  return (
    <>
      <Routes>
      <Route path="/login" element={<LoginPage/>} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage/>
          </ProtectedRoute>} />


          
      </Routes>
    </>
  );
};