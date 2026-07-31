import {
  Card,
  CardContent,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Skeleton,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";

import { useRecentEmployees } from "../../hooks/useDashboard";

function RecentEmployeesTable() {
  const { data, isLoading } =
    useRecentEmployees();

   if (isLoading) {
  return (
    <Card elevation={3}>
      <CardContent>
        <Skeleton
          width={220}
          height={35}
        />

        <Skeleton
          variant="rounded"
          height={300}
        />
      </CardContent>
    </Card>
  );
}

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
        >
          Recent Employees
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data?.map((employee: any) => (
              <TableRow key={employee._id}>
                <TableCell>
  <Box
    display="flex"
    alignItems="center"
    gap={2}
  >
    <Avatar
      src={employee.profileImage}
      sx={{
        width: 42,
        height: 42,
      }}
    />

    <Box>
      <Typography
        fontWeight={600}
      >
        {employee.firstName} {employee.lastName}
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
      >
        {employee.email}
      </Typography>
    </Box>
  </Box>
</TableCell>

                <TableCell>
                  {employee.department.name}
                </TableCell>

                <TableCell>
                  {employee.designation}
                </TableCell>
                <TableCell>
  <Chip
    label={employee.status}
    color={
      employee.status === "Active"
        ? "success"
        : "default"
    }
    size="small"
  />
</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default RecentEmployeesTable;