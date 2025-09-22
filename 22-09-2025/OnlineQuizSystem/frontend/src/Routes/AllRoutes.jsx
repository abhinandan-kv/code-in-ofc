import { Route, Routes } from "react-router-dom";
import SignUp from "../Components/Pages/Auth/SignUp";
import LoginIn from "../Components/Pages/Auth/LoginIn";
import ProtectedRoute from "./ProtectedRoute";

function AllRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginIn />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <div>BEST DASHBOARD</div>
            </ProtectedRoute>
          }
        />

        {/* all other routes */}
        <Route path="*" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
