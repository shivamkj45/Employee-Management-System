import { useState } from "react";

import {
  Typography,
  Box,
  Paper,
} from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";

import Loading from "../../components/common/Loading";
import EmployeeToolbar from "../../components/employees/EmployeeToolbar";
import EmployeeTable from "../../components/employees/EmployeeTable";

import { useEmployees } from "../../hooks/useEmployees";
import { useDepartments } from "../../hooks/useDepartments";

function EmployeesPage() {
  const [search, setSearch] =
    useState("");

  const {
    data,
    isLoading,
  } = useEmployees();

  const { data: departments } =
  useDepartments();

console.log(departments);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  const employees =
    data?.employees ?? [];

  const filteredEmployees =
    employees.filter((employee) => {
      const name =
        `${employee.firstName} ${employee.lastName}`;

      return (
        name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        employee.employeeId
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    });

  return (
    <DashboardLayout>
      <Box
        sx={{
          width: "100%",
          maxWidth: 1400,
          mx: "auto",
          px: 2,
          py: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{
            mb: 3,
            fontWeight: 700,
          }}
        >
          Employees
        </Typography>

        <EmployeeToolbar
          search={search}
          setSearch={setSearch}
        />

        <Paper
          elevation={3}
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 3,
          }}
        >
          <EmployeeTable
            employees={filteredEmployees}
          />
        </Paper>
      </Box>
    </DashboardLayout>
  );
}

export default EmployeesPage;