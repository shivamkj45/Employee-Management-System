import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Drawer,
  Stack,
  Typography,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import WorkIcon from "@mui/icons-material/Work";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PendingIcon from "@mui/icons-material/Pending";

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

  const statusColor =
    leave.status === "Approved"
      ? "success"
      : leave.status === "Rejected"
      ? "error"
      : "warning";

  const StatusIcon =
    leave.status === "Approved"
      ? CheckCircleIcon
      : leave.status === "Rejected"
      ? CancelIcon
      : PendingIcon;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{
          width: 430,
          p: 3,
          bgcolor: "#fafafa",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Typography
          variant="h5"
          fontWeight={700}
          mb={3}
        >
          Leave Details
        </Typography>

        {/* Employee Card */}

        <Card elevation={3}>
          <CardContent>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
            >
              <Avatar
                src={leave.employee.profileImage}
                sx={{
                  width: 75,
                  height: 75,
                }}
              />

              <Box>
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {leave.employee.firstName}{" "}
                  {leave.employee.lastName}
                </Typography>

                <Typography color="text.secondary">
                  {leave.employee.employeeId}
                </Typography>

                <Chip
                  sx={{ mt: 1 }}
                  color={statusColor}
                  icon={<StatusIcon />}
                  label={leave.status}
                />
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Employee Info */}

        <Card
          sx={{
            mt: 3,
          }}
        >
          <CardContent>

            <Typography
              variant="h6"
              mb={2}
            >
              Employee Information
            </Typography>

            <Stack spacing={2}>

              <Stack direction="row" spacing={1}>
                <PersonIcon
                  color="primary"
                />
                <Typography>
                  {leave.employee.firstName}{" "}
                  {leave.employee.lastName}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <BusinessIcon
                  color="primary"
                />
                <Typography>
                  {leave.employee.department
                    ?.name ?? "--"}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1}>
                <WorkIcon
                  color="primary"
                />
                <Typography>
                  {leave.employee.designation}
                </Typography>
              </Stack>

            </Stack>

          </CardContent>
        </Card>

        {/* Leave Info */}

        <Card
          sx={{
            mt: 3,
          }}
        >
          <CardContent>

            <Typography
              variant="h6"
              mb={2}
            >
              Leave Information
            </Typography>

            <Stack spacing={1.5}>

              <Typography>
                <strong>Leave Type:</strong>{" "}
                {leave.leaveType}
              </Typography>

              <Typography>
                <strong>Duration:</strong>{" "}
                {new Date(
                  leave.startDate
                ).toLocaleDateString()}{" "}
                -{" "}
                {new Date(
                  leave.endDate
                ).toLocaleDateString()}
              </Typography>

              <Typography>
                <strong>Total Days:</strong>{" "}
                {totalDays}
              </Typography>

              <Typography>
                <strong>Reason:</strong>{" "}
                {leave.reason}
              </Typography>

              <Typography>
                <strong>Applied On:</strong>{" "}
                {new Date(
                  leave.createdAt
                ).toLocaleString()}
              </Typography>

            </Stack>

          </CardContent>
        </Card>

        {/* Approval Section */}

        {(leave.status === "Approved" ||
          leave.status === "Rejected") && (

          <Card
            sx={{
              mt: 3,
            }}
          >
            <CardContent>

              <Typography
                variant="h6"
                mb={2}
              >
                {leave.status} Information
              </Typography>

              <Stack spacing={1.5}>

                {leave.status === "Approved" && (
                  <>
                    <Typography>
                      <strong>Approved By:</strong>{" "}
                      {leave.approvedBy?.name ??
                        leave.approvedBy?.employee
  ? `${leave.approvedBy.employee.firstName} ${leave.approvedBy.employee.lastName}`
  : leave.approvedBy?.email ?? "--"}
                    </Typography>

                    <Typography>
                      <strong>Approved At:</strong>{" "}
                      {leave.approvedAt
                        ? new Date(
                            leave.approvedAt
                          ).toLocaleString()
                        : "--"}
                    </Typography>

                    <Typography>
                      <strong>Remarks:</strong>{" "}
                      {leave.approvalRemarks ??
                        "--"}
                    </Typography>
                  </>
                )}

                {leave.status === "Rejected" && (
                  <>
                    <Typography>
                      <strong>Rejected By:</strong>{" "}
                      {leave.rejectedBy?.name ??
                        leave.rejectedBy?.employee
  ? `${leave.rejectedBy.employee.firstName} ${leave.rejectedBy.employee.lastName}`
  : leave.rejectedBy?.email ?? "--"}
                    </Typography>

                    <Typography>
                      <strong>Rejected At:</strong>{" "}
                      {leave.rejectedAt
                        ? new Date(
                            leave.rejectedAt
                          ).toLocaleString()
                        : "--"}
                    </Typography>

                    <Typography>
                      <strong>Reason:</strong>{" "}
                      {leave.rejectionRemarks ??
                        "--"}
                    </Typography>
                  </>
                )}

              </Stack>

            </CardContent>
          </Card>
        )}

        {/* Timeline */}

        <Card
          sx={{
            mt: 3,
            mb: 3,
          }}
        >
          <CardContent>

            <Typography
              variant="h6"
              mb={2}
            >
              Timeline
            </Typography>

            <Stack spacing={2}>

              <Stack
                direction="row"
                spacing={2}
              >
                <EventIcon color="primary" />

                <Box>
                  <Typography fontWeight={600}>
                    Leave Applied
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {new Date(
                      leave.createdAt
                    ).toLocaleString()}
                  </Typography>
                </Box>
              </Stack>

              {leave.approvedAt && (
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <CheckCircleIcon color="success" />

                  <Box>
                    <Typography fontWeight={600}>
                      Leave Approved
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {new Date(
                        leave.approvedAt
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              )}

              {leave.rejectedAt && (
                <Stack
                  direction="row"
                  spacing={2}
                >
                  <CancelIcon color="error" />

                  <Box>
                    <Typography fontWeight={600}>
                      Leave Rejected
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {new Date(
                        leave.rejectedAt
                      ).toLocaleString()}
                    </Typography>
                  </Box>
                </Stack>
              )}

            </Stack>

          </CardContent>
        </Card>

      </Box>
    </Drawer>
  );
}

export default LeaveDetailsDrawer;