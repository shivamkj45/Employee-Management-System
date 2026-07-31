import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import DashboardLayout from "../../layouts/DashboardLayout";
import EmployeeForm from "../../components/employees/EmployeeForm";
import Loading from "../../components/common/Loading";

import { useEmployee } from "../../hooks/useEmployees";

function EditEmployee() {
  const { id } = useParams();

  const {
    data: employee,
    isLoading,
  } = useEmployee(id!);

  if (isLoading) {
    return (
      <DashboardLayout>
        <Loading />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <Typography
        component="h1"
        variant="h4"
        sx={{ mb: 3 }}
      >
        Edit Employee
      </Typography>

      <EmployeeForm employee={employee} />
    </DashboardLayout>
  );
}

export default EditEmployee;