import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
} from "@mui/material";

interface Props {
  attendance?: any;
}

function AttendanceSummaryCard({
  attendance,
}: Props) {
  if (!attendance) {
    return (
      <Card elevation={3}>
        <CardContent>
          <Typography variant="h6">
            Today's Attendance
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            No attendance record found.
          </Typography>
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
          Today's Attendance
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={600}>
              Check In
            </Typography>

            <Typography>
              {attendance.checkIn
                ? new Date(
                    attendance.checkIn
                  ).toLocaleTimeString()
                : "--"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={600}>
              Check Out
            </Typography>

            <Typography>
              {attendance.checkOut
                ? new Date(
                    attendance.checkOut
                  ).toLocaleTimeString()
                : "--"}
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={600}>
              Working Hours
            </Typography>

            <Typography>
              {attendance.workingHours ??
                0} hrs
            </Typography>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={600}>
              Status
            </Typography>

            <Chip
              label={attendance.status}
              color={
                attendance.status ===
                "Present"
                  ? "success"
                  : attendance.status ===
                    "Late"
                  ? "warning"
                  : "default"
              }
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Typography fontWeight={600}>
              Late Minutes
            </Typography>

            <Typography>
              {attendance.lateMinutes ??
                0}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default AttendanceSummaryCard;