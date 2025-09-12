import { Route, Routes } from "react-router-dom";
import LoginPage from "../Component/LoginPage";
import ChatPage from "../Component/ChatPage(Primitive)";
import SignupPage from "../Component/SignupPage";
import ChatPageNew from "../Component/ChatPage(New)";
import ProtectedRoute from "../Component/Auth/ProtectedRoute";

export default function AllRoutes() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<h1>Best Chat App</h1>} /> */}
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/chat/primitive" element={<ChatPage />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <ChatPageNew />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<LoginPage />} />
      </Routes>
    </>
  );
}
