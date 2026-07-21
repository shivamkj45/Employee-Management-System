import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import HRDashboard from "../pages/Dashboard/HRDashboard";
import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";

import ProtectedRoute from "../components/auth/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/hr"
        element={
          <ProtectedRoute>
            <HRDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/manager"
        element={
          <ProtectedRoute>
            <ManagerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/employee"
        element={
          <ProtectedRoute>
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default AppRoutes;