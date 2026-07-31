import {
  Drawer,
  Box,
  Typography,
  Divider,
  Avatar,
  Chip,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  attendance: any;
}

function AttendanceDetailsDrawer({
  open,
  onClose,
  attendance,
}: Props) {
  if (!attendance) return null;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 380,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={2}
        >
          Attendance Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box
          display="flex"
          alignItems="center"
          gap={2}
          mb={3}
        >
          <Avatar
            src={attendance.employee.profileImage}
            sx={{
              width: 64,
              height: 64,
            }}
          />

          <Box>
            <Typography fontWeight={700}>
              {attendance.employee.firstName}{" "}
              {attendance.employee.lastName}
            </Typography>

            <Typography color="text.secondary">
              {attendance.employee.designation}
            </Typography>
          </Box>
        </Box>

        <Typography mb={1}>
          <strong>Department:</strong>{" "}
          {attendance.employee.department.name}
        </Typography>

        <Typography mb={1}>
          <strong>Email:</strong>{" "}
          {attendance.employee.email}
        </Typography>

        <Typography mb={1}>
          <strong>Phone:</strong>{" "}
          {attendance.employee.phone}
        </Typography>

        <Typography mb={1}>
          <strong>Check In:</strong>{" "}
          {attendance.checkIn
            ? new Date(
                attendance.checkIn
              ).toLocaleTimeString()
            : "--"}
        </Typography>

        <Typography mb={1}>
          <strong>Check Out:</strong>{" "}
          {attendance.checkOut
            ? new Date(
                attendance.checkOut
              ).toLocaleTimeString()
            : "--"}
        </Typography>

        <Typography mb={2}>
          <strong>Working Hours:</strong>{" "}
          {attendance.workingHours ?? "--"}
        </Typography>

        <Chip
          label={attendance.status}
          color={
            attendance.status === "Present"
              ? "success"
              : attendance.status === "Absent"
              ? "error"
              : attendance.status === "Leave"
              ? "warning"
              : "info"
          }
        />

        <Divider sx={{ my: 3 }} />

        <Typography fontWeight={700}>
          Remarks
        </Typography>

        <Typography color="text.secondary">
          {attendance.remarks || "No remarks"}
        </Typography>
      </Box>
    </Drawer>
  );
}

export default AttendanceDetailsDrawer;