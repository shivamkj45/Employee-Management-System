import Typography from "@mui/material/Typography";
import DashboardLayout from "../../layouts/DashboardLayout";

import LeaveSummaryCards from "../../components/leave/LeaveSummaryCards";
import LeaveTable from "../../components/leave/LeaveTable";
import LeaveToolbar from "../../components/leave/LeaveToolbar";

import { useAllLeaves } from "../../hooks/useLeave";
import { useDepartments } from "../../hooks/useDepartments";
import {
  exportLeaveToExcel,
  exportLeaveToPDF,
} from "../../utils/leaveExport";
import { useState } from "react";

function LeavePage() {
  const {
    data: leaves = [],
    isLoading,
  } = useAllLeaves();

  const {
    data: departmentsData = [],
  } = useDepartments();

  const [search, setSearch] = useState("");

  const [department, setDepartment] =
    useState("");

  const [leaveType, setLeaveType] =
    useState("");

  const [status, setStatus] =
    useState("");

  const departments = departmentsData.map(
    (department: any) => department.name
  );

  const filteredLeaves = leaves.filter(
    (leave: any) => {
      const fullName =
        `${leave.employee.firstName} ${leave.employee.lastName}`.toLowerCase();

      const matchesSearch =
        fullName.includes(
          search.toLowerCase()
        );

      const matchesDepartment =
        department === "" ||
        leave.employee.department?.name ===
          department;

      const matchesLeaveType =
        leaveType === "" ||
        leave.leaveType === leaveType;

      const matchesStatus =
        status === "" ||
        leave.status === status;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesLeaveType &&
        matchesStatus
      );
    }
  );

  if (isLoading) {
    return (
      <DashboardLayout>
        <Typography>
          Loading...
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Leave Management
      </Typography>

      <LeaveSummaryCards />

      <Typography
        variant="h5"
        sx={{
          mt: 5,
          mb: 2,
          fontWeight: 700,
        }}
      >
        Leave Requests
      </Typography>

      <LeaveToolbar
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        status={status}
        setStatus={setStatus}
        departments={departments}
        onExportExcel={() =>
  exportLeaveToExcel(
    filteredLeaves
  )
}
        onExportPDF={() =>
  exportLeaveToPDF(
    filteredLeaves
  )
}
      />

      <LeaveTable
        leaves={filteredLeaves}
      />
    </DashboardLayout>
  );
}

export default LeavePage;