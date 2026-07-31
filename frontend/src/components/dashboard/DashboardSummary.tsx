import Grid from "@mui/material/Grid";

import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import PendingActionsIcon from "@mui/icons-material/PendingActions";

import StatCard from "./StatCard";
import { useDashboardSummary } from "../../hooks/useDashboard";

function DashboardSummary() {
  const { data, isLoading } =
    useDashboardSummary();

  if (isLoading) return null;

  return (
    <Grid container spacing={3} mb={3}>
      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="Employees"
          value={data.totalEmployees}
          icon={<GroupsIcon fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="Departments"
          value={data.totalDepartments}
          icon={<ApartmentIcon fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="Present"
          value={data.presentToday}
          icon={<CheckCircleIcon fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="Absent"
          value={data.absentToday}
          icon={<CancelIcon fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="On Leave"
          value={data.employeesOnLeave}
          icon={<BeachAccessIcon fontSize="large" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, lg: 2 }}>
        <StatCard
          title="Pending Leave"
          value={data.pendingLeaveRequests}
          icon={<PendingActionsIcon fontSize="large" />}
        />
      </Grid>
    </Grid>
  );
}

export default DashboardSummary;