import Typography from "@mui/material/Typography";

import DashboardLayout from "../../layouts/DashboardLayout";
import EmployeeForm from "../../components/employees/EmployeeForm";

function AddEmployee() {
  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        sx={{
          mb: 3,
          fontWeight: 700,
        }}
      >
        Add Employee
      </Typography>

      <EmployeeForm />
    </DashboardLayout>
  );
}

export default AddEmployee;