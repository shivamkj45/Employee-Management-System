import { Grid, Typography } from "@mui/material";

import EmployeeGrowthChart from "../../components/dashboard/EmployeeGrowthChart";
import DepartmentChart from "../../components/dashboard/DepartmentChart";
import LeaveChart from "../../components/dashboard/LeaveChart";
import AttendanceChart from "../../components/dashboard/AttendanceChart";
import RecentEmployeesTable from "../../components/dashboard/RecentEmployeesTable";

function AdminDashboard() {
  return (
    <>
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: 700 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <EmployeeGrowthChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <DepartmentChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <LeaveChart />
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <AttendanceChart />
        </Grid>

        <Grid size={12}>
          <RecentEmployeesTable />
        </Grid>
      </Grid>
    </>
  );
}

export default AdminDashboard;