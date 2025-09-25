import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Todo from "../Component/Todo";
import SignUp from "../Component/Auth/SignUp";
import LoginIn from "../Component/Auth/LoginIn";
import Note from "../Component/Note";

function AllRoutes() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LoginIn />} />

        {/* Protected Routes */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <Todo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Note />
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
