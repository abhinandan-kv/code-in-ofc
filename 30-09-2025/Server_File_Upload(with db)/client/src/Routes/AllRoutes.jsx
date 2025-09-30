import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginIn from "../components/pages/Auth/LoginIn";
import SignUp from "../components/pages/Auth/SignUp";
import TeacherLayout from "../components/pages/Layout/TeacherLayout";
import StudentLayout from "../components/pages/Layout/StudentLayout";
import TeacherDashboard from "../components/pages/Teacher/Dashboard/TeacherDashboard";
import TeacherStudentList from "../components/pages/Teacher/Students/TeacherStudentList";
import SubjectList from "../components/pages/Teacher/Subjects/SubjectList";

function AllRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginIn />} />

        {/* Protected Routes */}
        {/* teacher route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <TeacherStudentList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <SubjectList />
            </ProtectedRoute>
          }
        />

        {/* all other routes */}
        <Route path="*" element={<LoginIn />} />
      </Routes>
    </>
  );
}

export default AllRoutes;
