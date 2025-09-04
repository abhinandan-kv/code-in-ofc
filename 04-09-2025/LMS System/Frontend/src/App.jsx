import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Toaster } from "sonner";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Component/Auth/ProtectedRoute";
import SignupPage from "./Component/Pages/Auth/SignupPage";
import LoginPage from "./Component/Pages/Auth/LoginPage";
import AdminDashboard from "./Component/Pages/Dashboards/AdminDashboard";
import UserDashboard from "./Component/Pages/Dashboards/UserDashboard";
import AdminBooks from "./Component/Pages/Books/Admin/AdminBooks";
import UserBooks from "./Component/Pages/Books/User/UserBooks";
import UserIssuedBooks from "./Component/Pages/IssuedPage/User/UserIssuedBooks";
import AdminAllIssuedBooks from "./Component/Pages/IssuedPage/Admin/AdminAllIssuedBooks";
import AdminIssueBookHistory from "./Component/Pages/IssuedPage/IssuedHistoryPage/Admin/AdminIssueBookHistory";
import ListAllUsers from "./Component/Pages/UserList/Admin/ListAllUsers";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          {/* Protected Routes */}
          {/* <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          /> */}
          {/* <Route
            path="/user/u"
            element={
              <ProtectedRoute>
                <h1>somehting is here</h1>
              </ProtectedRoute>
            }
          /> */}

          {/* Admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <ListAllUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/books"
            element={
              <ProtectedRoute>
                <AdminBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/bookissued"
            element={
              <ProtectedRoute>
                <AdminAllIssuedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/issue/history"
            element={
              <ProtectedRoute>
                <AdminIssueBookHistory />
              </ProtectedRoute>
            }
          />

          {/* Users */}
          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/books"
            element={
              <ProtectedRoute>
                <UserBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/issuedbooks"
            element={
              <ProtectedRoute>
                <UserIssuedBooks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/issued/history"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
