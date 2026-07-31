import {
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { useUploadProfile } from "../../hooks/useUploadProfile";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
//import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDepartments } from "../../hooks/useDepartments";
import { useCreateEmployee } from "../../hooks/useCreateEmployee";
import {
  employeeSchema,
  type EmployeeFormData,
} from "../../validations/employee.schema";

import type { Employee } from "../../types/employee.types";
import { useEffect } from "react";
import { useUpdateEmployee } from "../../hooks/useUpdateEmployee";

interface Props {
  employee?: Employee;
}

function EmployeeForm({ employee }: Props) {
  const navigate = useNavigate();

  const updateMutation = useUpdateEmployee();
  const createMutation =
  useCreateEmployee();

  const uploadMutation =
  useUploadProfile();
  const {
  data: departments = [],
} = useDepartments();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(employeeSchema),

    defaultValues: {
  employeeId: employee?.employeeId ?? "",
  firstName: employee?.firstName ?? "",
  lastName: employee?.lastName ?? "",
  email: employee?.email ?? "",
  phone: employee?.phone ?? "",
  designation: employee?.designation ?? "",
  department: employee?.department?._id ?? "",
  salary: employee?.salary ?? 0,
  joiningDate:
    employee?.joiningDate
      ?.split("T")[0] ?? "",
  role: employee?.role ?? "employee",
  status: employee?.status ?? "Active",
  address: employee?.address ?? "",
},
  });

  useEffect(() => {
  if (!employee) return;

  reset({
    employeeId: employee.employeeId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    phone: employee.phone,
    designation: employee.designation,
    department: employee.department?._id,
    salary: employee.salary,
    joiningDate: employee.joiningDate.split("T")[0],
    role: employee.role,
    status: employee.status,
    address: employee.address,
  });
}, [employee, reset]);
const handleImageUpload = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  if (!employee) return;

  const file = event.target.files?.[0];

  if (!file) return;

  await uploadMutation.mutateAsync({
    id: employee._id,
    file,
  });
};

  const onSubmit = async (data: EmployeeFormData) => {
    console.log("Submitted data:", data);
    console.log("Submitting Create", data);
    if (employee) {
      await updateMutation.mutateAsync({
        id: employee._id,
        data,
      });

      navigate("/employees");
      return;
    }

    await createMutation.mutateAsync(data);

navigate("/employees");
  };
console.log(employee);
  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          mb: 4,
          fontWeight: 700,
        }}
      >
        Employee Information
      </Typography>
      <Stack
  alignItems="center"
  spacing={2}
  sx={{ mb: 4 }}
>
  <Avatar
    src={employee?.profileImage}
    sx={{
      width: 120,
      height: 120,
    }}
  />

  {employee && (
    <Button
      component="label"
      variant="outlined"
      startIcon={<CloudUploadIcon />}
      disabled={uploadMutation.isPending}
    >
      {uploadMutation.isPending
        ? "Uploading..."
        : "Upload Profile Image"}

      <input
        hidden
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
      />
    </Button>
  )}
</Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Employee ID"
              {...register("employeeId")}
              error={!!errors.employeeId}
              helperText={errors.employeeId?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="First Name"
              {...register("firstName")}
              error={!!errors.firstName}
              helperText={errors.firstName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Last Name"
              {...register("lastName")}
              error={!!errors.lastName}
              helperText={errors.lastName?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    label="Phone Number"
    {...register("phone")}
    error={!!errors.phone}
    helperText={errors.phone?.message}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    label="Designation"
    {...register("designation")}
    error={!!errors.designation}
    helperText={errors.designation?.message}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    label="Department"
    {...register("department")}
    error={!!errors.department}
    helperText={errors.department?.message}
  >
    {departments.map((department) => (
      <MenuItem
        key={department._id}
        value={department._id}
      >
        {department.name}
      </MenuItem>
    ))}
  </TextField>
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    type="number"
    label="Salary"
    {...register("salary")}
    error={!!errors.salary}
    helperText={errors.salary?.message}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    fullWidth
    type="date"
    label="Joining Date"
    InputLabelProps={{
      shrink: true,
    }}
    {...register("joiningDate")}
    error={!!errors.joiningDate}
    helperText={errors.joiningDate?.message}
  />
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    label="Role"
    {...register("role")}
    error={!!errors.role}
    helperText={errors.role?.message}
  >
    <MenuItem value="admin">Admin</MenuItem>
    <MenuItem value="hr">HR</MenuItem>
    <MenuItem value="manager">Manager</MenuItem>
    <MenuItem value="employee">Employee</MenuItem>
  </TextField>
</Grid>

<Grid size={{ xs: 12, md: 6 }}>
  <TextField
    select
    fullWidth
    label="Status"
    {...register("status")}
    error={!!errors.status}
    helperText={errors.status?.message}
  >
    <MenuItem value="Active">
      Active
    </MenuItem>

    <MenuItem value="Inactive">
      Inactive
    </MenuItem>
  </TextField>
</Grid>

<Grid size={{ xs: 12 }}>
  <TextField
    fullWidth
    multiline
    minRows={3}
    label="Address"
    {...register("address")}
    error={!!errors.address}
    helperText={errors.address?.message}
  />
</Grid>

          <Grid size={{ xs: 12 }}>
            <Button
            fullWidth
  type="submit"
  variant="contained"
  size="large"
  disabled={
  updateMutation.isPending ||
  createMutation.isPending
}
  sx={{
    px: 5,
    py: 1.4,
    borderRadius: 2,
  }}
>
  {
updateMutation.isPending ||
createMutation.isPending
?
"Saving..."
:
employee
?
"Update Employee"
:
"Create Employee"
}
</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default EmployeeForm;