import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "./Component/Pages/Dashboards/AdminDashboard";
import VendorDashboard from "./Component/Pages/Dashboards/VendorDashboard";
import UserDashboard from "./Component/Pages/Dashboards/UserDashboard";

import ProductPage from "./Component/Pages/Products/ProductPage";
import ProductList from "./Component/Pages/Products/ProductList";
import UserProductPage from "./Component/Pages/Users/Products/UserProductPage";
import UserProductList from "./Component/Pages/Users/Products/UserProductList";
import VendorProducts from "./Component/Pages/Vendors/Products/VendorProduct";
import VendorProductPage from "./Component/Pages/Vendors/Products/VendorProductPage";

import UserSettings from "./Component/Pages/Users/Setting/UserSettings";

import VendorList from "./Component/Pages/Vendors/VendorList";
import VendorPage from "./Component/Pages/Vendors/VendorPage";
import VendorOrders from "./Component/Pages/Vendors/Orders/VendorOrders";

import CartPage from "./Component/Pages/Users/Cart/CartPage";
import OrderNow from "./Component/Pages/Users/Cart/OrderNow";

import PendingRequests from "./Component/Pages/Admin/PendingRequests";

import LoginPage from "./Component/Pages/Auth/LoginPage";
import SignupPage from "./Component/Pages/Auth/SignupPage";
import VerifyOTPPage from "./Component/Pages/Auth/VerifyOTPPage";

import ProtectedRoute from "./Component/Auth/ProtectedRoute";
import OrderList from "./Component/Pages/Users/Orders/OrderList";
import AdminAuditPage from "./Component/Pages/Admin/AdminAuditPage";
import ForgotPassword from "./Component/Pages/Auth/ForgotPassword";
import Verify2FASetup from "./Component/Pages/Users/Setting/Verify2FASetup";
import AdminCategoryPage from "./Component/Pages/Admin/AdminCategoryPage";
import PostForgotPassword from "./Component/Pages/Auth/PostForgotPassword";
import RevenueGenerated from "./Component/Pages/Vendors/Revenue/RevenueGenerated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify-otp" element={<VerifyOTPPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/postforgotpassword" element={<PostForgotPassword />} />

        {/* Protected Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/auditlogs"
          element={
            <ProtectedRoute>
              <AdminAuditPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categorymanage"
          element={
            <ProtectedRoute>
              <AdminCategoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute>
              <VendorList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/:id"
          element={
            <ProtectedRoute>
              <VendorPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <ProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/products"
          element={
            <ProtectedRoute>
              <UserProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/products/:id"
          element={
            <ProtectedRoute>
              <UserProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/settings"
          element={
            <ProtectedRoute>
              <UserSettings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/users/orders"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/users/orders/:id" //buy now button
          element={
            <ProtectedRoute>
              <OrderNow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users/orders"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-2fa-setup"
          element={
            <ProtectedRoute>
              <Verify2FASetup />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/dashboard"
          element={
            <ProtectedRoute>
              <VendorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/revenue"
          element={
            <ProtectedRoute>
              <RevenueGenerated />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/orders"
          element={
            <ProtectedRoute>
              <VendorOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/products"
          element={
            <ProtectedRoute>
              <VendorProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/product/:id"
          element={
            <ProtectedRoute>
              <VendorProductPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/request"
          element={
            <ProtectedRoute>
              <PendingRequests />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
