import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";

import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useEmployee } from "../../hooks/useEmployees";

function EmployeeDetails() {
  const { id } = useParams();

  const {
    data: employee,
    isLoading,
  } = useEmployee(id!);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Box
          display="flex"
          justifyContent="center"
          mt={5}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  if (!employee) {
    return (
      <DashboardLayout>
        <Typography color="error">
          Employee not found.
        </Typography>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
          color: "text.primary",
        }}
      >
        Employee Details
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          gap={3}
          mb={4}
        >
          <Avatar
            src={employee.profileImage}
            sx={{
              width: 90,
              height: 90,
            }}
          />

          <Box>
            <Typography variant="h5">
              {employee.firstName}{" "}
              {employee.lastName}
            </Typography>

            <Typography color="text.secondary">
              {employee.designation}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography>
                  <strong>Employee ID:</strong>{" "}
                  {employee.employeeId}
                </Typography>

                <Typography>
                  <strong>Email:</strong>{" "}
                  {employee.email}
                </Typography>

                <Typography>
                  <strong>Phone:</strong>{" "}
                  {employee.phone}
                </Typography>

                <Typography>
                  <strong>Department:</strong>{" "}
                  {employee.department?.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography>
                  <strong>Role:</strong>{" "}
                  {employee.role}
                </Typography>

                <Typography>
                  <strong>Status:</strong>{" "}
                  {employee.status}
                </Typography>

                <Typography>
                  <strong>Salary:</strong> ₹
                  {employee.salary}
                </Typography>

                <Typography>
                  <strong>Address:</strong>{" "}
                  {employee.address}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </DashboardLayout>
  );
}

export default EmployeeDetails;