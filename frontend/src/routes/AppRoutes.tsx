import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Auth/Login";

import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import HRDashboard from "../pages/Dashboard/HRDashboard";
import ManagerDashboard from "../pages/Dashboard/ManagerDashboard";
import EmployeeDashboard from "../pages/Dashboard/EmployeeDashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import EmployeesPage from "../pages/Employees/EmployeesPage";
import EmployeeDetails from "../pages/Employees/EmployeeDetails";
import EditEmployee from "../pages/Employees/EditEmployee";
import AddEmployee from "../pages/Employees/AddEmployee";
import AttendancePage from "../pages/Attendance/AttendancePage";
import LeavePage from "../pages/Leave/LeavePage";
import NotificationPage from "../pages/Notification/NotificationPage";
import DepartmentPage from "../pages/Department/DepartmentPage";
import AuditLogsPage from "../pages/Audit/AuditLogsPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
  path="/admin"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <AdminDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/hr"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <HRDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/manager"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ManagerDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/employee"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <EmployeeDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/employees"
  element={
    <ProtectedRoute>
      <EmployeesPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/employees/add"
  element={
    <ProtectedRoute>
      <AddEmployee />
    </ProtectedRoute>
  }
/>
<Route
  path="/employees/:id"
  element={
    <ProtectedRoute>
      <EmployeeDetails />
    </ProtectedRoute>
  }
/>
<Route
  path="/employees/edit/:id"
  element={
    <ProtectedRoute>
      <EditEmployee />
    </ProtectedRoute>
  }
/>
<Route
  path="/attendance"
  element={
    <ProtectedRoute>
      <AttendancePage />
    </ProtectedRoute>
  }
/>

<Route
  path="/leave"
  element={
    <ProtectedRoute>
      <LeavePage />
    </ProtectedRoute>
  }
/>
<Route
  path="/departments"
  element={
    <ProtectedRoute>
      <DepartmentPage />
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={<NotificationPage />}
/>
<Route
  path="/audit"
  element={
    <ProtectedRoute>
      <AuditLogsPage />
    </ProtectedRoute>
  }
/><Route
  path="/audit"
  element={
    <ProtectedRoute>
      <AuditLogsPage />
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