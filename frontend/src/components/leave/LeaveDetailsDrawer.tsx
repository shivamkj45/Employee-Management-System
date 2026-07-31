import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  leave: any;
}

function LeaveDetailsDrawer({
  open,
  onClose,
  leave,
}: Props) {
  if (!leave) return null;

  const totalDays =
    Math.ceil(
      (new Date(leave.endDate).getTime() -
        new Date(leave.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 420,
          p: 3,
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Leave Details
        </Typography>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          mb={3}
        >
          <Avatar
            src={leave.employee.profileImage}
            sx={{
              width: 72,
              height: 72,
            }}
          />

          <Box>
            <Typography
              fontWeight={700}
            >
              {leave.employee.firstName}{" "}
              {leave.employee.lastName}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {leave.employee.employeeId}
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ mb: 2 }} />

        <Typography
          variant="subtitle1"
          fontWeight={700}
          gutterBottom
        >
          Employee Information
        </Typography>

        <Stack spacing={1.5}>
          <Typography>
            <strong>
              Department:
            </strong>{" "}
            {
              leave.employee.department
                ?.name
            }
          </Typography>

          <Typography>
            <strong>
              Designation:
            </strong>{" "}
            {
              leave.employee
                .designation
            }
          </Typography>
        </Stack>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={700}
          gutterBottom
        >
          Leave Information
        </Typography>

        <Stack spacing={1.5}>
          <Typography>
            <strong>
              Leave Type:
            </strong>{" "}
            {leave.leaveType}
          </Typography>

          <Typography>
            <strong>
              Start Date:
            </strong>{" "}
            {new Date(
              leave.startDate
            ).toLocaleDateString()}
          </Typography>

          <Typography>
            <strong>
              End Date:
            </strong>{" "}
            {new Date(
              leave.endDate
            ).toLocaleDateString()}
          </Typography>

          <Typography>
            <strong>
              Total Days:
            </strong>{" "}
            {totalDays}
          </Typography>

          <Typography>
            <strong>
              Reason:
            </strong>{" "}
            {leave.reason}
          </Typography>

          <Typography>
            <strong>
              Applied On:
            </strong>{" "}
            {new Date(
              leave.createdAt
            ).toLocaleString()}
          </Typography>

          <Box>
            <strong>Status:</strong>{" "}
            <Chip
              label={leave.status}
              color={
                leave.status ===
                "Approved"
                  ? "success"
                  : leave.status ===
                    "Rejected"
                  ? "error"
                  : "warning"
              }
            />
          </Box>
        </Stack>

        <Divider
          sx={{
            my: 3,
          }}
        />

        <Typography
          variant="subtitle1"
          fontWeight={700}
          gutterBottom
        >
          Approval Information
        </Typography>

        <Stack spacing={1.5}>
          <Typography>
            <strong>
              Approved By:
            </strong>{" "}
            {leave.approvedBy
              ?.email ?? "--"}
          </Typography>

          <Typography>
            <strong>
              Approved At:
            </strong>{" "}
            {leave.approvedAt
              ? new Date(
                  leave.approvedAt
                ).toLocaleString()
              : "--"}
          </Typography>

          <Typography>
            <strong>
              Approval Remarks:
            </strong>{" "}
            {leave.approvalRemarks ??
              "--"}
          </Typography>

          <Typography>
            <strong>
              Rejected By:
            </strong>{" "}
            {leave.rejectedBy
              ?.email ?? "--"}
          </Typography>

          <Typography>
            <strong>
              Rejected At:
            </strong>{" "}
            {leave.rejectedAt
              ? new Date(
                  leave.rejectedAt
                ).toLocaleString()
              : "--"}
          </Typography>

          <Typography>
            <strong>
              Rejection Remarks:
            </strong>{" "}
            {leave.rejectionRemarks ??
              "--"}
          </Typography>
        </Stack>
      </Box>
    </Drawer>
  );
}

export default LeaveDetailsDrawer;